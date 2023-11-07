import { Globe } from "lucide-react";

import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useLanguage } from "./language-provider";
import { languages } from "../config/languages";

export function LanguageToggle() {
    const { setLanguage } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                    <Globe size={16} />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((item, i) => (
                    <DropdownMenuItem key={i} onClick={() => setLanguage(item)} className="cursor-pointer">
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
