"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// import { DataTable } from "@/components/data-table"; // uncomment when component is created
// import { EmptyState } from "@/components/empty-state"; // uncomment when component is created
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";

import { useAgentsFilters } from "../../hooks/use-agents-filters";
// import { columns } from "../components/columns"; // uncomment when columns is created
// import { DataPagination } from "../components/data-pagination"; // uncomment when component is created

export const AgentsView = () => {
    const router = useRouter();
    const [filters, setFilters] = useAgentsFilters();
    const trpc = useTRPC();

    const { data } = useSuspenseQuery(
        trpc.agents.getMany.queryOptions({
            ...filters,
        })
    );

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            {data.items.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">
                        No agents found. Create your first agent!
                    </p>
                </div>

                // Uncomment when EmptyState component is created:
                // <EmptyState
                //     title="Create your first agent"
                //     description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
                // />
            ) : (
                <>
                    {/* Uncomment when DataTable + columns are created */}
                    {/* <DataTable
                        data={data.items}
                        columns={columns}
                        onRowClick={(row) => {
                            if (row.id) {
                                router.push(`/agents/${row.id}`);
                            }
                        }}
                    /> */}

                    {/* Temporary agent list until DataTable is created */}
                    <div className="flex flex-col gap-y-2">
                        {data.items.map((agent) => (
                            <div
                                key={agent.id}
                                onClick={() => router.push(`/agents/${agent.id}`)}
                                className="flex items-center gap-x-3 p-4 bg-background rounded-lg shadow-sm cursor-pointer hover:bg-muted transition"
                            >
                                <div className="flex flex-col">
                                    <p className="font-medium text-sm">{agent.name}</p>
                                    <p className="text-xs text-muted-foreground truncate max-w-[300px]">
                                        {agent.instructions}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Uncomment when DataPagination is created */}
                    {/* <DataPagination
                        page={filters.page}
                        totalPages={data.totalPages}
                        onPageChange={(page) => setFilters({ page })}
                    /> */}
                </>
            )}
        </div>
    );
};

export const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="This may take a few seconds"
        />
    );
};

export const AgentsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Agents"
            description="Something went wrong"
        />
    );
};