import "./index.css";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "components/shared/theme-provider";
import { LanguageProvider } from "components/shared/language-provider";
import { Toaster } from "components/ui/toast/toaster";
import { App } from "./app";
import { AuthProvider } from "components/shared/auth-provider";

const Layout = () => {
    return (
        <AuthProvider storageKey="meunovoapp-auth">
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
        </AuthProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Layout />);
