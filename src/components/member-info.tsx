import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
    avatar?: string;
    username: string;
    name: string;
    lastName: string;
}

export function MemberInfo({ avatar, username, name, lastName }: Props) {
    return (
        <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 border">
                <AvatarImage src={avatar} alt={`@${username}`} />
                <AvatarFallback>{[name.charAt(0), lastName.charAt(0)].join("").toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-left text-sm font-medium">
                    {name} {lastName}
                </span>
                <span className="text-xs text-muted-foreground">@{username}</span>
            </div>
        </div>
    );
}
