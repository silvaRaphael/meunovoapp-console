import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { sideBarWidth } from "./side-bar";
import { MainNav } from "./main-nav";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";
import { Button } from "../ui/button";
import { Logo } from "./logo";
import { Notifications } from "./notifications";
import { useEffect, useState } from "react";
import { Notification } from "config/notifications";
import { HandleRequest } from "lib/handle-request";
import { useUserData } from "./user-data-provider";
import { socket } from "pages/chat/components/websocket";
import { Message } from "pages/chat/data/message";
import { toast } from "components/ui/toast/use-toast";
import { ToastAction } from "components/ui/toast/toast";
import { useLanguage } from "./language-provider";

export function TopBar({ pathname, toggleSideBar, isOpen }: { pathname: string; toggleSideBar: any; isOpen: boolean }) {
    const { userData } = useUserData();
    const { writeLang } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const [notifications, setNotifications] = useState<Notification[] | null>(null);

    async function getNotifications() {
        const request = await new HandleRequest().get(`/notifications`);

        request.onDone((response) => {
            setNotifications(response);
        });

        request.onError((error) => {
            setNotifications(null);
            if (error.redirect) navigate(error.redirect);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getNotifications();

        socket.on("offlineMessage", (message: Message) => {
            toast({
                variant: "message",
                title: `${
                    writeLang([
                        ["en", "New message from"],
                        ["pt", "Nova mensagem de"],
                    ]) as string
                } ${message.user.name}`,
                description: <div className="line-clamp-2 text-xs">{message.text.substring(0, 200)}</div>,
                action: (
                    <ToastAction
                        altText={
                            writeLang([
                                ["en", "Open chat."],
                                ["pt", "Abrir chat"],
                            ]) as string
                        }
                        onClick={() => {
                            navigate(`/chat`);
                        }}
                    >
                        Abrir chat
                        {writeLang([
                            ["en", "Open chat."],
                            ["pt", "Abrir chat"],
                        ])}
                    </ToastAction>
                ),
            });
        });

        if (location.pathname !== "/chat") {
            socket.emit("logoutChats");
        }

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="flex w-full h-12 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50">
                <div
                    className="flex justify-between items-center px-4 h-full border-r"
                    style={{
                        width: sideBarWidth,
                    }}
                >
                    <Link to="/" className="flex items-center text-sm font-medium">
                        <Logo scale={0.75} />
                    </Link>
                    <Button variant="ghost" size="sm" className="p-2" onClick={toggleSideBar}>
                        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </Button>
                </div>
                <MainNav pathname={pathname} />
                <div className="flex items-center justify-end space-x-2 ps-2 pe-4 border-l h-full">
                    <div className="flex items-center space-x-1">
                        <Notifications notifications={notifications ?? []} />
                        <LanguageToggle userData={userData} />
                        <ThemeToggle />
                    </div>
                    <UserNav />
                </div>
            </div>
            <div className="h-12"></div>
        </>
    );
}
