"use client";

// import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// import { DataTable } from "@/components/data-table"; // uncomment when component is created
// import { EmptyState } from "@/components/empty-state"; // uncomment when component is created
import { LoadingState } from "@/components/loading-state";
//import { useTRPC } from "@/trpc/client"; // uncomment when agents router is wired

// import { useAgentsFilters } from "../../hooks/use-agents-filters"; // uncomment when hook is created
// import { columns } from "../components/columns"; // uncomment when columns is created
// import { DataPagination } from "../components/data-pagination"; // uncomment when component is created

export const AgentsView = () => {
    const router = useRouter();
    void router; // temporary — used when tRPC and navigation are set up

    // const [filters, setFilters] = useAgentsFilters(); // uncomment when hook is created
    // const trpc = useTRPC(); // uncomment when agents router is wired

     // const { data } = useSuspenseQuery(
         // trpc.agents.getMany.queryOptions({
             // ...filters,
         // })
     // ); // uncomment when agents router is wired

    // Temporary placeholder until data is wired
    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <p className="text-muted-foreground text-sm">
                Agents list coming soon...
            </p>

            {/* Uncomment when data is wired */}
            {/* {data.items.length === 0 ? (
                <EmptyState
                    title="Create your first agent"
                    description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
                />
            ) : (
                <>
                    <DataTable
                        data={data.items}
                        columns={columns}
                        onRowClick={(row) => {
                            if (row.id) {
                                router.push(`/agents/${row.id}`);
                            }
                        }}
                    />

                    <DataPagination
                        page={filters.page}
                        totalPages={data.totalPages}
                        onPageChange={(page) => setFilters({ page })}
                    />
                </>
            )} */}
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
        // Temporary inline error until ErrorState component is created
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-y-2">
                <p className="text-destructive font-medium">Error Loading Agents</p>
                <p className="text-muted-foreground text-sm">Something went wrong</p>
            </div>
        </div>

        // Uncomment when ErrorState component is created
        // <ErrorState title="Error Loading Agents" description="Something went wrong" />
    );
};