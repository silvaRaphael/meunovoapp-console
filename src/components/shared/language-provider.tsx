import { Langs } from "config/languages";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export type Language = {
    label: string;
    lang: Langs;
    locale: string;
    currency: string;
    dateLocale: Locale;
    flag: string;
};

type LanguageProviderProps = {
    children: React.ReactNode;
    defaultLanguage?: Pick<Language, "lang" | "locale" | "currency">;
    storageKey?: string;
};

type LanguageProviderState = {
    language: Pick<Language, "lang" | "locale" | "currency">;
    setLanguage: (language: Pick<Language, "lang" | "locale" | "currency">) => void;
    writeLang: (texts: [string, string | ReactNode][]) => string | ReactNode;
};

const initialState: LanguageProviderState = {
    language: {
        lang: "en",
        locale: "en-US",
        currency: "USD",
    },
    setLanguage: () => null,
    writeLang: () => "",
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
    children,
    defaultLanguage = {
        lang: "en",
        locale: "en-US",
        currency: "USD",
    },
    storageKey = "quat-language",
    ...props
}: LanguageProviderProps) {
    const [language, setLanguage] = useState<Pick<Language, "lang" | "locale" | "currency">>(
        () => JSON.parse(localStorage.getItem(storageKey) as string) || defaultLanguage,
    );

    useEffect(() => {
        const root = window.document.documentElement;
        root.lang = language.lang;
    }, [language]);

    const value = {
        language,
        setLanguage: (language: Pick<Language, "lang" | "locale" | "currency">) => {
            localStorage.setItem(storageKey, JSON.stringify(language));
            setLanguage(language);
        },
        writeLang: (texts: [string, string | ReactNode][], lang?: Langs) => {
            const text = texts.find((item) => item[0] === (lang ?? language.lang)) as Array<string>;

            if (!text) return texts[0][1];

            return text[1];
        },
    };

    return (
        <LanguageProviderContext.Provider {...props} value={value}>
            {children}
        </LanguageProviderContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageProviderContext);

    if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider");

    return context;
};
