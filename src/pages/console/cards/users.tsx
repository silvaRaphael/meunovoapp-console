import { Language } from "components/shared/language-provider";
import { MemberInfo } from "components/shared/member-info";
import { formatDistance } from "date-fns";
import { Langs, languages } from "config/languages";

export function UsersCard({
    users,
    language,
    writeLang,
}: {
    users: {
        name: string;
        email: string;
        avatar: string;
        activated_at: Date;
        is_manager: boolean;
    }[];
    language: Pick<Language, "lang" | "locale" | "currency">;
    writeLang: (texts: [Langs, React.ReactNode][]) => React.ReactNode;
}) {
    return (
        <div className="space-y-4 h-[200px] max-h-[200px] overflow-auto vertical-scrollbar pe-4">
            {users.length ? (
                users.map((item, i) => (
                    <div key={i} className="flex space-x-4 justify-between items-center">
                        <MemberInfo
                            name={item.name}
                            email={item.email}
                            avatar={item.avatar}
                            isManager={item.is_manager}
                        />
                        {item.activated_at ? (
                            <span className="text-xs font-medium text-end">
                                {writeLang([
                                    ["en", "Active "],
                                    ["pt", "Ativo "],
                                ])}
                                {formatDistance(new Date(item.activated_at), new Date(), {
                                    locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                                    addSuffix: true,
                                })}
                            </span>
                        ) : null}
                    </div>
                ))
            ) : (
                <div className="flex w-full h-full justify-center items-center">
                    <span className="font-medium text-muted-foreground">
                        {writeLang([
                            ["en", "No users yet."],
                            ["pt", "Nenhum usuário ainda."],
                        ])}
                    </span>
                </div>
            )}
        </div>
    );
}
