import { z } from "zod";

import { agentsRouter } from "@/modules/agents/server/procedures";

import { meetingsRouter } from "@/modules/meetings/server/procedures";
// import { premiumRouter } from "@/modules/premium/server/procedures";
import { baseProcedure, createTRPCRouter } from "../init";


export const appRouter = createTRPCRouter({
  // Example route (keep or remove as needed)
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),

  // Agents router
  agents: agentsRouter,

  meetings: meetingsRouter,
  // premium: premiumRouter,
});

// Export API type
export type AppRouter = typeof appRouter;
