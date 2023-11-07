import { Language } from "../components/language-provider";
import { enUS, es, ptBR } from "date-fns/locale";

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
    {
        label: "Español",
        lang: "es",
        locale: "es-ES",
        currency: "EUR",
        dateLocale: es,
        flag: "https://flagsapi.com/ES/flat/64.png",
    },
];
