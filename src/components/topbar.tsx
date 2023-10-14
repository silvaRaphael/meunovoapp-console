import { Code2, Plus, Settings } from "lucide-react";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";
import { Link } from "react-router-dom";

export function Topbar({
    title,
    pathname,
    tree,
}: {
    title: string;
    pathname: string;
    tree?: { label: string; pathname?: string }[];
}) {
    return (
        <>
            <div className="border-b">
                <div className="flex h-14 items-center px-4">
                    <div className="pe-2">
                        <a
                            href="/"
                            className="flex items-center text-sm font-medium"
                        >
                            <Code2 className="me-1 h-4 w-4" />
                            MODULAR
                        </a>
                    </div>
                    <MainNav pathname={pathname} />
                    <div className="ml-auto flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <Settings size={16} />
                        </Button>
                        <UserNav />
                    </div>
                </div>
            </div>
            <div className="border-b bg-slate-50">
                <div className="flex h-12 items-center px-4">
                    <div className="text-sm font-medium flex space-x-2">
                        <Link to={pathname}>{title}</Link>
                        <div className="flex space-x-1">
                            {tree?.map((item, i) =>
                                item.pathname ? (
                                    <Link key={i} to={item.pathname}>
                                        / {item.label}
                                    </Link>
                                ) : (
                                    <span key={i}>/ {item.label}</span>
                                ),
                            )}
                        </div>
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        <Search />
                        <Button size="sm">
                            <Plus size={16} className="me-1 text-white" />
                            <span className="text-sm font-medium">Add</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
