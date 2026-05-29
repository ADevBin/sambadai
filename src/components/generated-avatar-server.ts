import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

interface GeneratedAvatarServerProps {
    seed: string;
    variant?: "botttsNeutral" | "initials";
}

export const generateAvatarUri = ({
    seed,
    variant = "botttsNeutral",
}: GeneratedAvatarServerProps): string => {
    const avatar =
        variant === "botttsNeutral"
            ? createAvatar(botttsNeutral, { seed })
            : createAvatar(initials, {
                seed,
                fontWeight: 500,
                fontSize: 42,
            });

    return `data:image/svg+xml;utf8,${encodeURIComponent(avatar.toString())}`;
};