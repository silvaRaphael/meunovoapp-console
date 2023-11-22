import { Language } from "../components/shared/language-provider";
import { enUS, ptBR } from "date-fns/locale";

export const languages: Language[] = [
    {
        label: "English",
        lang: "en",
        locale: "en-US",
        currency: "USD",
        dateLocale: enUS,
        flag: "https://flagsapi.com/US/flat/64.png",
    },
    {
        label: "Português",
        lang: "pt",
        locale: "pt-BR",
        currency: "BRL",
        dateLocale: ptBR,
        flag: "https://flagsapi.com/BR/flat/64.png",
    },
];
