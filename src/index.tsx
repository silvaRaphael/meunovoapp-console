import "./index.css";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "components/shared/theme-provider";
import { LanguageProvider } from "components/shared/language-provider";
import { Toaster } from "components/ui/toast/toaster";
import { App } from "./app";
import { UserDataProvider } from "components/shared/user-data-provider";
import { TooltipProvider } from "components/ui/tooltip";
import { languages } from "config/languages";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "components/shared/query";

const Layout = () => {
  const initialLanguage = languages.find((item) => item.locale.startsWith(navigator.language.split("-")[0]));

  return (
    <UserDataProvider storageKey="meunovoapp-user-data">
      <ThemeProvider defaultTheme="system" storageKey="meunovoapp-ui-theme">
        <LanguageProvider defaultLanguage={initialLanguage} storageKey="meunovoapp-language">
          <TooltipProvider delayDuration={0}>
            <Toaster />
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </UserDataProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Layout />);
