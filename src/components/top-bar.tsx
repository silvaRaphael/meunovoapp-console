import { ChevronLeft, ChevronRight, Container } from "lucide-react";
import { UserNav } from "./user-nav";
import { Link } from "react-router-dom";
import { sideBarWidth } from "./side-bar";
import { ThemeToggle } from "./theme-toggle";
import { Notifications } from "./notifications";
import { Button } from "./ui/button";
import { MainNav } from "./main-nav";

export function TopBar({ pathname, toggleSideBar, isOpen }: { pathname: string; toggleSideBar: any; isOpen: boolean }) {
    return (
        <div className="flex w-full h-12 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div
                className="flex justify-between items-center px-4 h-full border-r"
                style={{
                    width: sideBarWidth,
                }}
            >
                <Link to="/" className="flex items-center text-sm font-medium">
                    <Container className="me-1" size={18} />
                    MODIO
                </Link>
                <Button variant="ghost" size="sm" className="p-2" onClick={toggleSideBar}>
                    {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </Button>
            </div>
            <MainNav pathname={pathname} />
            <div className="flex items-center justify-end space-x-2 ps-2 pe-4 border-l h-full">
                <div className="flex items-center space-x-1">
                    <Notifications />
                    <ThemeToggle />
                </div>
                <UserNav />
            </div>
        </div>
    );
}
