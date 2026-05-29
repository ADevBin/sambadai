"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface GeneratedAvatarProps {
    src: string;
    seed: string;
    className?: string;
}

export const GeneratedAvatar = ({
    src,
    seed,
    className,
}: GeneratedAvatarProps) => {
    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={src} alt="Avatar" />
            <AvatarFallback>
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
};