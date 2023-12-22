import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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
import { BASE_API } from "config/constants";
import { useAuth } from "./auth-provider";

export function TopBar({ pathname, toggleSideBar, isOpen }: { pathname: string; toggleSideBar: any; isOpen: boolean }) {
    const { auth } = useAuth();

    const [notifications, setNotifications] = useState<Notification[] | null>(null);

    async function getNotifications() {
        const request = await new HandleRequest().get(`${BASE_API}/notifications`, {
            token: auth?.token,
        });

        request.onDone((response) => {
            setNotifications(response);
        });

        request.onError(() => {
            setNotifications(null);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getNotifications();

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
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                    <UserNav />
                </div>
            </div>
            <div className="h-12"></div>
        </>
    );
}
