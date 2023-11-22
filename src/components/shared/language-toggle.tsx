import { Globe } from "lucide-react";

import { Button } from "components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/ui/dropdown-menu";
import { Language, useLanguage } from "./language-provider";
import { languages } from "config/languages";
import { useNavigate } from "react-router-dom";

export function LanguageToggle() {
    const { setLanguage } = useLanguage();
    const navigate = useNavigate();

    function handleChangeLanguage(language: Language) {
        setLanguage(language);
        navigate("/");
    }

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
                    <DropdownMenuItem key={i} onClick={() => handleChangeLanguage(item)} className="cursor-pointer">
                        <img src={item.flag} className="w-4 me-2" alt="Flag" />
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
