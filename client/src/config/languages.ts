import { Language } from "../components/language-provider";
import { enUS, ptBR } from "date-fns/locale";

export const languages: Language[] = [
    {
        label: "English",
        lang: "en",
        locale: "en-US",
        currency: "USD",
        dateLocale: enUS,
    },
    {
        label: "Português",
        lang: "pt",
        locale: "pt-BR",
        currency: "BRL",
        dateLocale: ptBR,
    },
];
