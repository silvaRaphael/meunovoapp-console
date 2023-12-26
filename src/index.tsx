import "./index.css";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "components/shared/theme-provider";
import { LanguageProvider } from "components/shared/language-provider";
import { Toaster } from "components/ui/toast/toaster";
import { App } from "./app";
import { UserDataProvider } from "components/shared/user-data-provider";
import { TooltipProvider } from "components/ui/tooltip";

const Layout = () => {
    return (
        <UserDataProvider storageKey="meunovoapp-user-data">
            <ThemeProvider defaultTheme="system" storageKey="meunovoapp-ui-theme">
                <LanguageProvider
                    defaultLanguage={{
                        lang: "pt",
                        locale: "pt-BR",
                        currency: "BRL",
                    }}
                    storageKey="meunovoapp-language"
                >
                    <TooltipProvider delayDuration={0}>
                        <Toaster />
                        <App />
                    </TooltipProvider>
                </LanguageProvider>
            </ThemeProvider>
        </UserDataProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Layout />);
