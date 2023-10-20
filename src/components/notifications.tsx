import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Notification, notifications } from "../config/notifications";
import { format } from "date-fns";

export function Notifications() {
    const notificationsLength = notifications.length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative p-2">
                    <Bell size={16} />
                    {notificationsLength && (
                        <div className="absolute top-[4px] right-[6px] w-[5px] h-[5px] rounded-full bg-neutral-50"></div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Welcome, {format(new Date(), "HH:mm")} now
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {!notificationsLength
                                ? "You don't have any notifications"
                                : `You have ${notificationsLength} notifications`}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="max-h-60 overflow-y-auto vertical-scrollbar">
                    {!notificationsLength ? (
                        <p className="text-xs font-medium text-muted-foreground p-2 py-3">
                            No notifications yet
                        </p>
                    ) : (
                        notifications.map((item: Notification, i) => {
                            const child = (
                                <div className="flex flex-col space-y-1">
                                    <span className="text-sm font-medium leading-none">
                                        {item.title}
                                    </span>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {item.subtitle}
                                    </p>
                                </div>
                            );
                            return (
                                <DropdownMenuItem
                                    key={i}
                                    className="cursor-pointer"
                                    asChild
                                >
                                    {item.link ? (
                                        <Link to={item.link}>{child}</Link>
                                    ) : (
                                        <div>{child}</div>
                                    )}
                                </DropdownMenuItem>
                            );
                        })
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
