"use client";

import { LoadingState } from "@/components/loading-state";

// import { useMutation } from "@tanstack/react-query"; // uncomment when Stream Chat is configured
// import { useEffect, useState } from "react"; // uncomment when Stream Chat is configured
// import type { Channel as StreamChannel } from "stream-chat"; // uncomment when Stream Chat is configured
// import {
//     Channel,
//     Chat,
//     MessageInput,
//     MessageList,
//     Thread,
//     useCreateChatClient,
//     Window,
// } from "stream-chat-react"; // uncomment when Stream Chat is configured
// import { useTRPC } from "@/trpc/client"; // uncomment when Stream Chat is configured
// import "stream-chat-react/dist/css/v2/index.css"; // uncomment when Stream Chat is configured

interface ChatUIProps {
    meetingId: string;
    meetingName: string;
    userId: string;
    userName: string;
    userImage: string | undefined;
}

export const ChatUI = ({
    meetingId,
    meetingName,
    userId,
    userName,
    userImage,
}: ChatUIProps) => {
    void meetingId;
    void meetingName;
    void userId;
    void userName;
    void userImage;

    // Uncomment when Stream Chat is configured:
    // const trpc = useTRPC();
    // const { mutateAsync: generateChatToken } = useMutation(
    //     trpc.meetings.generateChatToken.mutationOptions(),
    // );
    // const [channel, setChannel] = useState<StreamChannel>();
    // const client = useCreateChatClient({
    //     apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
    //     tokenOrProvider: generateChatToken,
    //     userData: {
    //         id: userId,
    //         name: userName,
    //         image: userImage,
    //     },
    // });

    // useEffect(() => {
    //     if (!client) return;
    //     const channel = client.channel("messaging", meetingId, {
    //         members: [userId],
    //     });
    //     setChannel(channel);
    // }, [client, meetingId, meetingName, userId]);

    // if (!client) {
    //     return (
    //         <LoadingState
    //             title="Loading Chat"
    //             description="This may take a few seconds"
    //         />
    //     );
    // }

    // return (
    //     <div className="bg-white rounded-lg border overflow-hidden">
    //         <Chat client={client}>
    //             <Channel channel={channel}>
    //                 <Window>
    //                     <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b">
    //                         <MessageList />
    //                     </div>
    //                     <MessageInput />
    //                 </Window>
    //                 <Thread />
    //             </Channel>
    //         </Chat>
    //     </div>
    // );

    // Temporary placeholder until Stream Chat is configured
    return (
        <div className="bg-white rounded-lg border overflow-hidden p-4">
            <LoadingState
                title="Chat Coming Soon"
                description="Stream Chat will be available once configured"
            />
        </div>
    );
};