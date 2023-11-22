import { useTheme } from "./theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button variant="ghost" size="sm" className="p-2" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
        </Button>
    );
}
