"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const HomeView = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    // Redirect after render
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/sign-in");
        }
    }, [session, isPending, router]);

    // Loading state
    if (isPending) {
        return <p>Loading...</p>;
    }

    // While redirecting
    if (!session) {
        return null;
    }

    return (
        <div className="flex flex-col p-4 gap-y-4">
            <p>
                Logged in as {session.user.name}
            </p>

            <Button
                onClick={() =>
                    authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                router.push("/sign-in");
                            },
                        },
                    })
                }
            >
                Sign Out
            </Button>
        </div>
    );
};