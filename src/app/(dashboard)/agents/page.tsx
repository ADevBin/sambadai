import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";

import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import {
    AgentsView,
    AgentsViewError,
    AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";

// Uncomment when nuqs + params are ready:
// import type { SearchParams } from "nuqs";
// import { loadSearchParams } from "@/modules/agents/params";
// interface Props { searchParams: Promise<SearchParams> };

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const queryClient = getQueryClient();

    // Uncomment when params is created:
    // const filters = await loadSearchParams(searchParams);

    void queryClient.prefetchQuery(
        trpc.agents.getMany.queryOptions({
            page: 1,
            pageSize: 10,
        })
    );

    return (
        <>
            <AgentsListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<AgentsViewLoading />}>
                    <ErrorBoundary fallback={<AgentsViewError />}>
                        <AgentsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    );
};

export default Page;