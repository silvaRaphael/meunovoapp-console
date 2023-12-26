import { Language } from "../components/shared/language-provider";
import { enUS, ptBR } from "date-fns/locale";

export type Langs = "pt" | "en";

export const languages: Language[] = [
    {
        label: "Português",
        lang: "pt",
        locale: "pt-BR",
        currency: "BRL",
        dateLocale: ptBR,
        flag: "https://flagsapi.com/BR/flat/64.png",
    },
    {
        label: "English",
        lang: "en",
        locale: "en-US",
        currency: "USD",
        dateLocale: enUS,
        flag: "https://flagsapi.com/US/flat/64.png",
    },
];
