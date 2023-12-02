import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useLanguage } from "./language-provider";

interface Props {
    id: string;
    company: string;
    logotipo?: string;
}

export function ClientInfo({ id, company, logotipo }: Props) {
    const { writeLang } = useLanguage();

    const companySplitted = company.split(" ");
    const companyInitials = [
        companySplitted[0][0],
        companySplitted.length === 1 ? companySplitted[0][companySplitted[0].length - 1] : companySplitted[companySplitted.length - 1][0],
    ]
        .join("")
        .toUpperCase();

    return (
        <Link
            to={
                writeLang([
                    ["en", `/clients/${id}`],
                    ["pt", `/clientes/${id}`],
                ]) as string
            }
        >
            <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border">
                    <AvatarImage src={logotipo} alt={`${company}`} />
                    <AvatarFallback>{companyInitials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                    <span className="text-left text-sm font-medium">{company}</span>
                </div>
            </div>
        </Link>
    );
}
