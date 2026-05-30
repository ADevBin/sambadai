// "use client";

// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "@/components/ui/avatar";
// import { cn } from "@/lib/utils";

// interface GeneratedAvatarProps {
//     seed: string;
//     className?: string;
//     variant?: "botttsNeutral" | "initials";
//     src?: string;
// }

// export const GeneratedAvatar = ({
//     seed,
//     className,
//     src,
// }: GeneratedAvatarProps) => {
//     return (
//         <Avatar className={cn(className)}>
//             {src && <AvatarImage src={src} alt={seed} />}
//             <AvatarFallback>
//                 {seed.charAt(0).toUpperCase()}
//             </AvatarFallback>
//         </Avatar>
//     );
// };

// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { cn } from "@/lib/utils";

// interface GeneratedAvatarProps {
//     seed: string;
//     className?: string;
//     variant?: "botttsNeutral" | "initials";
// }

// export const GeneratedAvatar = ({
//     seed,
//     className,
//     variant = "botttsNeutral",
// }: GeneratedAvatarProps) => {
//     const style = variant === "botttsNeutral" ? "bottts-neutral" : "initials";
//     const encodedSeed = encodeURIComponent(seed);
//     const src = `https://api.dicebear.com/9.x/${style}/svg?seed=${encodedSeed}&fontWeight=500&fontSize=42`;

//     return (
//         <Avatar className={cn(className)}>
//             <AvatarImage src={src} alt={seed} />
//             <AvatarFallback>
//                 {seed.charAt(0).toUpperCase()}
//             </AvatarFallback>
//         </Avatar>
//     );
// };
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarVariant = "botttsNeutral" | "initials" | "notionists" | "lorelei" | "avataaars";

interface GeneratedAvatarProps {
    seed: string;
    className?: string;
    variant?: AvatarVariant;
}

const styleMap: Record<AvatarVariant, string> = {
    botttsNeutral: "bottts-neutral",
    initials: "initials",
    notionists: "notionists",
    lorelei: "lorelei",
    avataaars: "avataaars",
};

export const GeneratedAvatar = ({
    seed,
    className,
    variant = "botttsNeutral",
}: GeneratedAvatarProps) => {
    const style = styleMap[variant];
    const encodedSeed = encodeURIComponent(seed);
    const src = `https://api.dicebear.com/9.x/${style}/svg?seed=${encodedSeed}`;

    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={src} alt={seed} />
            <AvatarFallback>
                {seed.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
};