import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
    logotipo?: string;
    company: string;
}

export function ClientInfo({ logotipo, company }: Props) {
    const companySplitted = company.split(" ");
    const companyInitials = [
        companySplitted[0][0],
        companySplitted.length === 1 ? companySplitted[0][companySplitted[0].length - 1] : companySplitted[companySplitted.length - 1][0],
    ]
        .join("")
        .toUpperCase();

    return (
        <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 border">
                <AvatarImage src={logotipo} alt={`${company}`} />
                <AvatarFallback>{companyInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
                <span className="text-left text-sm font-medium">{company}</span>
            </div>
        </div>
    );
}
