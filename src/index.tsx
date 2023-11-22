import "./index.css";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "components/shared/theme-provider";
import { LanguageProvider } from "components/shared/language-provider";
import { Toaster } from "components/ui/toast/toaster";
import { App } from "./App";

const Layout = () => {
    return (
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
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Layout />);
