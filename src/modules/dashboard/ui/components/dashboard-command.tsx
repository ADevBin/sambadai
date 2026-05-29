"use client";

// import { useQuery } from "@tanstack/react-query"; // install when tRPC is set up
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

// import { GeneratedAvatar } from "@/components/generated-avatar"; // uncomment when dicebear is fixed

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList
} from "@/components/ui/command";

// import { useTRPC } from "@/trpc/client"; // uncomment when tRPC is set up

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    void router; // temporary — used when tRPC routes are set up
    void setOpen; // temporary — used when CommandResponsiveDialog is set up

    // const trpc = useTRPC();

    // const meetings = useQuery(
    //     trpc.meetings.getMany.queryOptions({
    //         search,
    //         pageSize: 100,
    //     })
    // );

    // const agents = useQuery(
    //     trpc.agents.getMany.queryOptions({
    //         search,
    //         pageSize: 100,
    //     })
    // );

    return (
        <Command>
            <CommandInput
                placeholder="Find a meeting or agent..."
                value={search}
                onValueChange={(value) => setSearch(value)}
            />
            <CommandList>
                <CommandGroup heading="Meetings">
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No meetings found
                        </span>
                    </CommandEmpty>
                    {/* Meetings list — uncomment when tRPC is set up */}
                    {/* {meetings.data?.items.map((meeting) => (
                        <CommandItem
                            onSelect={() => {
                                router.push(`/meetings/${meeting.id}`);
                                setOpen(false);
                            }}
                            key={meeting.id}
                        >
                            {meeting.name}
                        </CommandItem>
                    ))} */}
                </CommandGroup>
                <CommandGroup heading="Agents">
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No agents found
                        </span>
                    </CommandEmpty>
                    {/* Agents list — uncomment when tRPC is set up */}
                    {/* {agents.data?.items.map((agent) => (
                        <CommandItem
                            onSelect={() => {
                                router.push(`/agents/${agent.id}`);
                                setOpen(false);
                            }}
                            key={agent.id}
                        >
                            <GeneratedAvatar
                                seed={agent.name}
                                variant="botttsNeutral"
                                className="size-5"
                            />
                            {agent.name}
                        </CommandItem>
                    ))} */}
                </CommandGroup>
            </CommandList>
        </Command>
    );
};