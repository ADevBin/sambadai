import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
// import type { SearchParams } from "nuqs"; // uncomment when nuqs is installed
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { auth } from "@/lib/auth";
import { getQueryClient } from "@/trpc/server";

// import { loadSearchParams } from "@/modules/agents/params"; // uncomment when params is created
// import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header"; // uncomment when component is created
import {
    AgentsView,
    AgentsViewError,
    AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";

// interface Props {
//     searchParams: Promise<SearchParams>; // uncomment when nuqs is installed
// };

const Page = async () => {
    // const filters = await loadSearchParams(searchParams); // uncomment when params is created

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const queryClient = getQueryClient();

    // void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
    //     ...filters, // uncomment when agents router is wired to trpc and params is created
    // }));

    return (
        <>
            {/* <AgentsListHeader /> */}{/* uncomment when component is created */}
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