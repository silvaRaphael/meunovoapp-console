import { Hash } from "lucide-react";
import { sideMenu } from "../config/site";
import { Link } from "react-router-dom";

export function MainNav({ pathname }: { pathname: string }) {
    return (
        <nav className="flex items-center space-x-4 mx-6">
            {sideMenu.map((item, i) => (
                <Link
                    key={i}
                    to={item.path}
                    className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                        pathname !== item.path ? "text-muted-foreground" : ""
                    }`}
                >
                    {item?.icon ?? <Hash className="mr-1 h-4 w-4" />}
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}
