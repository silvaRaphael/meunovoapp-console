import { Link, useNavigate } from "react-router-dom";
import { Hash, LogOutIcon } from "lucide-react";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";
import { SideMenu } from "config/site";
import { user } from "config/user";
import { cn } from "lib/utils";
import { useLanguage } from "./language-provider";

export const sideBarWidth = 200;
export const sideBarWidthCollapsed = 48;

export function SideBar({ pathname, isOpen }: { pathname: string; isOpen: boolean }) {
    const { writeLang } = useLanguage();
    const navigate = useNavigate();

    const menu = SideMenu({ writeLang }).find((item) => item.role.includes(user.role))?.menu ?? [];

    function handleLogout() {
        navigate("/login");
    }

    return (
        <div
            className="fixed bg-background z-40"
            style={{
                width: isOpen ? sideBarWidth : sideBarWidthCollapsed,
                height: "calc(100vh - 48px)",
            }}
        >
            <div className="flex flex-col h-full border-r">
                <nav
                    className="flex flex-col pb-5 overflow-y-auto vertical-scrollbar"
                    style={{
                        height: "calc(100vh - 48px - 40px)",
                    }}
                >
                    {menu.map((item, i) => (
                        <div className="flex flex-col justify-start pb-2" key={i}>
                            <div className="text-xs font-semibold px-4 py-3">
                                {isOpen ? item.title : item.title && <DotsHorizontalIcon width={14} className="-ms-[2px] -mt-1 mb-1" />}
                            </div>
                            <div className={cn(isOpen ? "px-4 space-y-2" : "px-0 space-y-2")}>
                                {item.menu.map((item, i) => {
                                    return (
                                        <Link
                                            key={i}
                                            to={item.path}
                                            className={cn(
                                                "flex items-center text-sm h-6 font-medium transition-colors hover:text-primary border-l-2 border-l-transparent group",
                                                pathname !== item.path ? "text-muted-foreground" : "",
                                                !isOpen ? "justify-center" : "",
                                                !isOpen && pathname === item.path ? "border-l-neutral-800 dark:border-l-neutral-200" : "",
                                            )}
                                        >
                                            {<div className={`${!isOpen && "scale-125"}`}>{item?.icon}</div> ?? <Hash className="mr-1" size={14} />}
                                            {isOpen && item.label}
                                            {!isOpen && <Badge className="z-50 hidden group-hover:flex absolute top-2 left-14 whitespace-nowrap">{item.label}</Badge>}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
                <div className="flex items-center text-xs font-medium px-4 border-t h-10 text-muted-foreground hover:text-primary cursor-pointer" onClick={handleLogout}>
                    <LogOutIcon className="me-1" size={12} />
                    {isOpen &&
                        writeLang([
                            ["en", "Log out"],
                            ["pt", "Sair"],
                        ])}
                </div>
            </div>
        </div>
    );
}
