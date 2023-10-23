import { Link } from "react-router-dom";
import { sideMenu } from "../config/site";
import { Hash, LogOutIcon } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { user } from "../config/user";

export const sideBarWidth = 200;
export const sideBarWidthCollapsed = 48;

export function SideBar({ pathname, isOpen }: { pathname: string; isOpen: boolean }) {
    return (
        <div
            className="fixed bg-background z-50"
            style={{
                width: isOpen ? sideBarWidth : sideBarWidthCollapsed,
                height: "calc(100vh - 48px)",
            }}
        >
            <div className="flex flex-col h-full border-r">
                <nav
                    className="flex flex-col overflow-y-auto vertical-scrollbar"
                    style={{
                        height: "calc(100vh - 48px - 40px)",
                    }}
                >
                    {sideMenu
                        .find((item) => item.role.includes(user.role))
                        ?.menu.map((item, i) => (
                            <div className="flex flex-col justify-start pb-2" key={i}>
                                <div className="text-xs font-semibold px-4 py-3">{isOpen ? item.title : <DotsHorizontalIcon width={14} />}</div>
                                <div className="px-4 space-y-2">
                                    {item.menu.map((item, i) => (
                                        <Link
                                            key={i}
                                            to={item.path}
                                            className={`flex items-center text-sm h-5 font-medium transition-colors hover:text-primary ${
                                                pathname !== item.path ? "text-muted-foreground" : ""
                                            }`}
                                        >
                                            {<div className={`${!isOpen && "scale-110"}`}>{item?.icon}</div> ?? <Hash className="mr-1" size={14} />}
                                            {isOpen && item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                </nav>
                <Link to="/logout" className="flex items-center text-xs font-medium px-4 border-t h-10">
                    <LogOutIcon className="me-1" size={12} />
                    {isOpen && "Log out"}
                </Link>
            </div>
        </div>
    );
}
