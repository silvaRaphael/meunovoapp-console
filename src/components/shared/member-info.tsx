import { BASE_FILES } from "config/constants";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Verified } from "lucide-react";
import { cn } from "lib/utils";

interface Props {
    absoluteAvatar?: string;
    avatar?: string;
    name: string;
    email: string;
    isManager?: boolean;
    className?: string;
}

export function MemberInfo({ absoluteAvatar, avatar, name, email, isManager = false, className }: Props) {
    const nameSplitted = name?.split(" ");
    const nameInitials = name
        ? [
              nameSplitted[0][0],
              nameSplitted.length === 1
                  ? nameSplitted[0].length > 1
                      ? nameSplitted[0][1]
                      : ""
                  : nameSplitted.length > 1
                  ? nameSplitted[nameSplitted.length - 1][0]
                  : nameSplitted[0].length > 1
                  ? nameSplitted[nameSplitted.length - 1][nameSplitted[0].length - 1]
                  : nameSplitted[nameSplitted.length - 1][0],
          ]
              .join("")
              .toUpperCase()
        : "";

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Avatar className="h-8 w-8 border">
                <AvatarImage
                    src={absoluteAvatar ?? (avatar ? `${BASE_FILES}/${avatar}` : "")}
                    alt={`${name}`}
                    className="object-cover"
                />
                <AvatarFallback>{nameInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
                <span className="flex items-center text-left text-sm font-medium">
                    {name}
                    {isManager && <Verified size={14} className="ms-1 text-green-700 dark:text-green-400" />}
                </span>
                <span className="text-xs text-muted-foreground text-ellipsis">{email}</span>
            </div>
        </div>
    );
}
