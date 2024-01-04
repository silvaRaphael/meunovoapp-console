import { useTheme } from "./theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="sm"
            className={cn("p-2", className)}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "light" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
        </Button>
    );
}
