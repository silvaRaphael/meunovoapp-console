import { Hash, MoonIcon, Settings, X } from "lucide-react";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";
import { Link } from "react-router-dom";
import { topMenu } from "../config/site";
import { sideBarWidth } from "./side-bar";

export function TopBar({ pathname }: { pathname: string }) {
    return (
        <div
            className="flex h-10 items-center border-b bg-background sticky top-0"
            style={{
                width: `calc(100vw - ${sideBarWidth}px)`,
            }}
        >
            <nav className="flex items-center w-full ps-4 pe-2 space-x-2 overflow-x-auto horizontal-scrollbar">
                {topMenu.map((item, i) => (
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
                                className="p-1 ms-1 rounded-md hover:bg-slate-100 invisible group-hover:visible"
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert(`close item ${item.label}`);
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
                    <Button variant="ghost" size="icon">
                        <MoonIcon size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Settings size={16} />
                    </Button>
                </div>
                <UserNav />
            </div>
        </div>
    );
}
