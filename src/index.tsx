import "./index.css";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "components/shared/theme-provider";
import { LanguageProvider } from "components/shared/language-provider";
import { Toaster } from "components/ui/toast/toaster";
import { App } from "./app";
import { UserDataProvider } from "components/shared/user-data-provider";

const Layout = () => {
    return (
        <UserDataProvider storageKey="meunovoapp-userData">
            <ThemeProvider defaultTheme="system" storageKey="meunovoapp-ui-theme">
                <LanguageProvider
                    defaultLanguage={{
                        lang: "pt",
                        locale: "pt-BR",
                        currency: "BRL",
                    }}
                    storageKey="meunovoapp-language"
                >
                    <Toaster />
                    <App />
                </LanguageProvider>
            </ThemeProvider>
        </UserDataProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Layout />);
