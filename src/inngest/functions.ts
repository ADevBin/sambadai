import { eq, inArray } from "drizzle-orm";
import Groq from "groq-sdk";
import JSONL from "jsonl-parse-stringify";

import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { StreamTranscriptItem } from "@/modules/meetings/types";

type TranscriptWithSpeaker = StreamTranscriptItem & {
  user: { name: string };
};

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const meetingsProcessing = inngest.createFunction(
  {
    id: "meetings/processing",
    retries: 0, // stop retrying on failure
  },
  { event: "meetings/processing" },

  async ({
    event,
    step,
  }: {
    event: { data: { transcriptUrl: string; meetingId: string } };
    step: {
      run: <T>(id: string, fn: () => Promise<T>) => Promise<T>;
      sleep: (id: string, duration: string) => Promise<void>;
    };
  }) => {
    // Step 1: Fetch transcript
    const response = await step.run("fetch-transcript", async () => {
      return fetch(event.data.transcriptUrl).then((res) => res.text());
    });

    // Step 2: Parse JSONL transcript
    const transcript = await step.run("parse-transcript", async () => {
      return JSONL.parse<StreamTranscriptItem>(response as string);
    });

    // Step 3: Add speaker names to transcript
    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds: string[] = [
        ...new Set(
          (transcript as StreamTranscriptItem[]).map((item) => item.speaker_id),
        ),
      ];

      if (speakerIds.length === 0) {
        return (transcript as StreamTranscriptItem[]).map(
          (item): TranscriptWithSpeaker => ({
            ...item,
            user: { name: "Unknown" },
          }),
        );
      }

      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds));

      const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds));

      const speakers = [...userSpeakers, ...agentSpeakers];

      return (transcript as StreamTranscriptItem[]).map(
        (item): TranscriptWithSpeaker => {
          const speaker = speakers.find((s) => s.id === item.speaker_id);

          if (!speaker) {
            return { ...item, user: { name: "Unknown" } };
          }

          return { ...item, user: { name: speaker.name } };
        },
      );
    });

    // Step 4: Pause before summarizing
    await step.sleep("pause-before-summary", "1s");

    // Step 5: Summarize transcript using Groq (free)
    const summary = await step.run("summarize-transcript", async () => {
      const formattedTranscript = (
        transcriptWithSpeakers as TranscriptWithSpeaker[]
      )
        .map((item) => `${item.user.name}: ${item.text}`)
        .join("\n");

      try {
        const completion = await groq.chat.completions.create({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: `You are an expert summarizer. You write readable, concise, simple content.

Use the following markdown structure for every output:

### Overview
Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences.

### Notes
Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

#### Section Name
- Main point or demo shown here
- Another key insight or interaction

#### Next Section
- Feature X automatically does Y
- Mention of integration with Z`,
            },
            {
              role: "user",
              content: `Summarize the following meeting transcript:\n\n${formattedTranscript}`,
            },
          ],
        });

        return (
          completion.choices[0]?.message?.content ?? "No summary available"
        );
      } catch (err) {
        console.error("Groq summarization error:", err);
        return "No summary available";
      }
    });

    // Step 6: Save summary to DB
    await step.run("save-summary", async () => {
      await db
        .update(meetings)
        .set({
          summary: summary as string,
          status: "completed",
        })
        .where(eq(meetings.id, event.data.meetingId));
    });

    return {
      message: `Meeting ${event.data.meetingId} processed successfully`,
      summary,
    };
  },
);