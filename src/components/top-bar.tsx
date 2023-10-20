import { ChevronLeft, ChevronRight, Container, Hash, X } from "lucide-react";
import { UserNav } from "./user-nav";
import { Link, useNavigate } from "react-router-dom";
import { MenuItem, menuItems } from "../config/site";
import { sideBarWidth } from "./side-bar";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Notifications } from "./notifications";
import { Button } from "./ui/button";

export function TopBar({
    pathname,
    toggleSideBar,
    isOpen,
}: {
    pathname: string;
    toggleSideBar: any;
    isOpen: boolean;
}) {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState<MenuItem[]>([]);

    function removeActiveMenuItem(item: MenuItem) {
        const _activeMenu = activeMenu.filter((act) => act.path !== item.path);

        localStorage.setItem(
            "activeMenu",
            JSON.stringify(_activeMenu.map((item) => item.path)),
        );

        if (item.path === pathname) return navigate("/");

        setActiveMenu(_activeMenu);
    }

    function initActiveMenuItems(pathname: string) {
        let activeMenuStoraged = localStorage.getItem("activeMenu");
        let _activeMenu: string[] = ["/"];

        if (activeMenuStoraged) _activeMenu = JSON.parse(activeMenuStoraged);

        let newActiveMenu = [..._activeMenu];
        if (!_activeMenu.find((item) => item === pathname))
            newActiveMenu.push(pathname);

        localStorage.setItem("activeMenu", JSON.stringify(newActiveMenu));

        let _newActiveMenu: MenuItem[] = [];
        newActiveMenu.forEach((item) => {
            const _item = menuItems.find((menu) => item === menu.path);
            if (_item) _newActiveMenu.push(_item);
        });

        setActiveMenu(_newActiveMenu);
    }

    useEffect(() => {
        initActiveMenuItems(pathname);
    }, [pathname]);

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
                    MODULAR
                </Link>
                <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                    onClick={toggleSideBar}
                >
                    {isOpen ? (
                        <ChevronLeft size={16} />
                    ) : (
                        <ChevronRight size={16} />
                    )}
                </Button>
            </div>
            <nav className="flex items-center flex-grow ps-4 pe-2 space-x-2 overflow-x-auto horizontal-scrollbar">
                {activeMenu.map((item, i) => (
                    <Link
                        key={i}
                        to={item.path}
                        className={`flex items-center text-sm font-medium h-9 transition-colors hover:text-primary group ${
                            pathname !== item.path
                                ? "text-muted-foreground"
                                : ""
                        }`}
                    >
                        <span className="flex items-center">
                            {item?.icon ?? <Hash className="mr-1" size={14} />}
                            {item.label}
                        </span>
                        {item.path === "/" ? (
                            <div className="w-4"></div>
                        ) : (
                            <span
                                className="p-1 ms-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 invisible group-hover:visible"
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeActiveMenuItem(item);
                                }}
                            >
                                <X size={12} />
                            </span>
                        )}
                    </Link>
                ))}
            </nav>
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
