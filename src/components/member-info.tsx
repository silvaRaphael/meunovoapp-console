import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface Props {
    avatar?: string;
    username: string;
    name: string;
    lastName: string;
    email: string;
    jobTitle: string;
    since: Date;
}

export function MemberInfo({ avatar, username, name, lastName, email, jobTitle, since }: Props) {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8 border">
                        <AvatarImage src={avatar} alt={`@${username}`} />
                        <AvatarFallback>{[name.charAt(0), lastName.charAt(0)].join("").toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                        <span className="text-left text-sm font-medium">
                            {name} {lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">@{username}</span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-xs p-0">
                <Card className="p-0 border-none w-min mx-auto">
                    <CardHeader>
                        <Avatar className="h-24 w-24 mx-auto">
                            <AvatarImage src={avatar} alt={`@${username}`} />
                            <AvatarFallback>{[name.charAt(0), lastName.charAt(0)].join("").toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <div className="flex flex-col space-y-1 items-center">
                            <p className="text-sm text-center font-medium leading-none">@{username}</p>
                            <p className="text-xs text-center leading-none text-muted-foreground">{email}</p>
                        </div>
                        <div className="flex flex-col space-y-1 items-center">
                            <p className="text-sm text-center font-medium leading-none">{jobTitle}</p>
                            <p className="text-xs text-center leading-none text-muted-foreground">{format(new Date(since), "PPP")}</p>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}
