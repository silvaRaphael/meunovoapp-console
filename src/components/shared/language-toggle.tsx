import { Globe } from "lucide-react";

import { Button } from "components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/ui/dropdown-menu";
import { Language, useLanguage } from "./language-provider";
import { languages } from "config/languages";
import { useNavigate } from "react-router-dom";
import { MenuItems } from "config/site";
import { UserData } from "./user-data-provider";

export function LanguageToggle({ userData = null }: { userData?: UserData | null }) {
    const { language, setLanguage, writeLang } = useLanguage();
    const navigate = useNavigate();

    function handleChangeLanguage(newLanguage: Language) {
        let redirect = "/";

        if (userData) {
            const menuItems = MenuItems({ userData, writeLang, lang: language.lang });

            const [, path, restPath] = window.location.pathname.split("/");

            const activeItemIndex = menuItems.indexOf(menuItems.find((item) => item.path === `/${path}`) as any);

            const newMenuItems = MenuItems({ userData, writeLang, lang: newLanguage.lang });

            redirect = `${newMenuItems[activeItemIndex].path}${restPath ? `/${restPath}` : ""}`;
        }

        setLanguage(newLanguage);

        navigate(redirect);
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
