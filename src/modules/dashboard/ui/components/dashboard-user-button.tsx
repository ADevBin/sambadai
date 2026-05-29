"use client";

import {
    ChevronDownIcon,
    LogOutIcon
} from "lucide-react";

import { useRouter } from "next/navigation";

import { GeneratedAvatar } from "@/components/generated-avatar";

import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";

interface DashboardUserButtonProps {
    userName: string;
    userEmail: string;
    userImage?: string | null;
}

export const DashboardUserButton = ({
    userName,
    userEmail,
    userImage,
}: DashboardUserButtonProps) => {
    const router = useRouter();
    const isMobile = useIsMobile();
    const { data, isPending } = authClient.useSession();

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/sign-in");
                },
            },
        });
    };

    if (isPending || !data?.user) {
        return null;
    }

    // Mobile View
    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 transition overflow-hidden gap-x-2">
                    {userImage ? (
                        <Avatar>
                            <AvatarImage src={userImage} alt={userName} />
                        </Avatar>
                    ) : (
                        <GeneratedAvatar
                            seed={userName}
                            src=""
                            className="size-9 mr-3"
                        />
                    )}

                    <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                        <p className="text-sm truncate w-full">
                            {userName}
                        </p>

                        <p className="text-xs truncate w-full text-muted-foreground">
                            {userEmail}
                        </p>
                    </div>

                    <ChevronDownIcon className="size-4 shrink-0" />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{userName}</DrawerTitle>
                        <DrawerDescription>
                            {userEmail}
                        </DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter>

                        {/* BILLING BUTTON - Uncomment later when billing system is ready */}
                        
                        {/*
                        <Button
                            variant="outline"
                            onClick={() => authClient.customer.portal()}
                        >
                            <CreditCardIcon className="size-4 text-black" />
                            Billing
                        </Button>
                        */}

                        <Button
                            variant="outline"
                            onClick={onLogout}
                        >
                            <LogOutIcon className="size-4" />
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    // Desktop View
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 transition overflow-hidden gap-x-2">
                {userImage ? (
                    <Avatar>
                        <AvatarImage src={userImage} alt={userName} />
                    </Avatar>
                ) : (
                    <GeneratedAvatar
                        seed={userName}
                        src=""
                        className="size-9 mr-3"
                    />
                )}

                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm truncate w-full">
                        {userName}
                    </p>

                    <p className="text-xs truncate w-full text-muted-foreground">
                        {userEmail}
                    </p>
                </div>

                <ChevronDownIcon className="size-4 shrink-0" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                side="right"
                className="w-72"
            >
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium truncate">
                            {userName}
                        </span>

                        <span className="text-sm font-normal text-muted-foreground truncate">
                            {userEmail}
                        </span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* BILLING MENU - Uncomment later when billing system is ready */}

                {/*
                <DropdownMenuItem
                    onClick={() => authClient.customer.portal()}
                    className="cursor-pointer flex items-center justify-between"
                >
                    Billing
                    <CreditCardIcon className="size-4" />
                </DropdownMenuItem>
                */}

                <DropdownMenuItem
                    onClick={onLogout}
                    className="cursor-pointer flex items-center justify-between"
                >
                    Logout
                    <LogOutIcon className="size-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};