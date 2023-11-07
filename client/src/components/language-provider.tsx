import { createContext, useContext, useEffect, useState } from "react";

export type Language = {
    label: string;
    lang: string;
    locale: string;
    currency: string;
};

type LanguageProviderProps = {
    children: React.ReactNode;
    defaultLanguage?: Language;
    storageKey?: string;
};

type LanguageProviderState = {
    language: Language;
    setLanguage: (language: Language) => void;
    writeLang: (texts: { lang: string; text: string }[]) => string;
};

const initialState: LanguageProviderState = {
    language: {
        label: "English",
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
        label: "English",
        lang: "en",
        locale: "en-US",
        currency: "USD",
    },
    storageKey = "quat-language",
    ...props
}: LanguageProviderProps) {
    const [language, setLanguage] = useState<Language>(() => JSON.parse(localStorage.getItem(storageKey) as string) || defaultLanguage);

    useEffect(() => {
        const root = window.document.documentElement;
        root.lang = language.lang;
    }, [language]);

    const value = {
        language,
        setLanguage: (language: Language) => {
            localStorage.setItem(storageKey, JSON.stringify(language));
            setLanguage(language);
        },
        writeLang: (texts: { lang: string; text: string }[]) => texts.find((item) => item.lang === language.lang)?.text ?? texts[0].text,
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
