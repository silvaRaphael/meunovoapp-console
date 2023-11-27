import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
    avatar?: string;
    name: string;
    email: string;
}

export function MemberInfo({ avatar, name, email }: Props) {
    const nameInitials = [name.split(" ")[0][0], name.split(" ")[1][0]].join("").toUpperCase();

    return (
        <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 border">
                <AvatarImage src={avatar} alt={`${name}`} />
                <AvatarFallback>{nameInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
                <span className="text-left text-sm font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">{email}</span>
            </div>
        </div>
    );
}
