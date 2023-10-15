import { Code2, Settings } from "lucide-react";
import { MainNav } from "./main-nav";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";

export function Topbar({ pathname }: { pathname: string }) {
    return (
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
    );
}
