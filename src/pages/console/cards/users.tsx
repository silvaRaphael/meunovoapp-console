import { Language } from "components/shared/language-provider";
import { MemberInfo } from "components/shared/member-info";
import { formatDistance } from "date-fns";
import { languages } from "config/languages";
import { useEffect, useState } from "react";
import { errorToast } from "components/shared/error-toast";
import { HandleRequest } from "lib/handle-request";

export function UsersCard({
    language,
    writeLang,
}: {
    language: Pick<Language, "lang" | "locale" | "currency">;
    writeLang: (texts: [string, React.ReactNode][]) => React.ReactNode;
}) {
    const [data, setData] = useState<
        {
            name: string;
            email: string;
            avatar: string;
            activated_at: Date;
        }[]
    >([]);

    async function getData() {
        const request = await new HandleRequest().get(`/dashboard/users`);

        request.onDone((response) => {
            setData(response);
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getData();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-4 h-[200px] max-h-[200px] overflow-auto vertical-scrollbar pe-4">
            {data.length ? (
                data.map((item, i) => (
                    <div key={i} className="flex space-x-4 justify-between items-center">
                        <MemberInfo name={item.name} email={item.email} avatar={item.avatar} />
                        <span className="text-xs font-medium text-end">
                            {writeLang([
                                ["en", "Active "],
                                ["pt", "Ativo "],
                            ])}

                            {item.activated_at
                                ? formatDistance(new Date(item.activated_at), new Date(), {
                                      locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                                      addSuffix: true,
                                  })
                                : null}
                        </span>
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
