import { useTheme } from "./theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";
import { useLanguage } from "./language-provider";

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const { writeLang } = useLanguage();

    return (
        <Tooltip>
            <TooltipTrigger onClick={() => setTheme(theme === "light" ? "dark" : "light")} asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn("p-2", className)}
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    {theme === "light" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
                </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={14}>
                {writeLang([
                    ["en", "Change Theme"],
                    ["pt", "Alterar Tema"],
                ])}
            </TooltipContent>
        </Tooltip>
    );
}
