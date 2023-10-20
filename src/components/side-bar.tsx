import { Link } from "react-router-dom";
import { sideMenu } from "../config/site";
import { Code2, Hash, LogOutIcon } from "lucide-react";

export const sideBarWidth = 200;

export function SideBar({ pathname }: { pathname: string }) {
    return (
        <div
            className="border-r fixed"
            style={{
                width: `calc(${sideBarWidth}px)`,
            }}
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center px-4 border-b h-12 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <Link
                        to="/"
                        className="flex items-center text-sm font-medium"
                    >
                        <Code2 className="me-1" size={18} />
                        MODULAR
                    </Link>
                </div>
                <nav
                    className="flex flex-col overflow-y-auto vertical-scrollbar"
                    style={{
                        height: "calc(100vh - 48px - 40px)",
                    }}
                >
                    {sideMenu.map((item, i) => (
                        <div
                            className="flex flex-col justify-start pb-2"
                            key={i}
                        >
                            <div className="text-xs font-semibold px-4 py-3">
                                {item.title}
                            </div>
                            <div className="px-4 space-y-2">
                                {item.menu.map((item, i) => (
                                    <Link
                                        key={i}
                                        to={item.path}
                                        className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                                            pathname !== item.path
                                                ? "text-muted-foreground"
                                                : ""
                                        }`}
                                    >
                                        {item?.icon ?? (
                                            <Hash className="mr-1 h-4 w-4" />
                                        )}
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
                <Link
                    to="/logout"
                    className="flex items-center text-xs font-medium px-4 border-t h-10"
                >
                    <LogOutIcon className="me-1" size={12} />
                    Log out
                </Link>
            </div>
        </div>
    );
}
