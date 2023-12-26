import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Page } from "../../components/shared/page";
import { SectionHeader } from "../../components/shared/section-header";

import { Bar, ComposedChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Language, useLanguage } from "components/shared/language-provider";
import { MemberInfo } from "components/shared/member-info";
import { addDays, format, formatDistance } from "date-fns";
import { languages } from "config/languages";
import { useEffect, useState } from "react";
import { errorToast } from "components/shared/error-toast";
import { HandleRequest } from "lib/handle-request";
import { Project } from "pages/projects/data/project";
import { User } from "pages/users/data/user";
import { Task } from "pages/tasks/data/task";

export function Console() {
    const { language, writeLang } = useLanguage();

    return (
        <Page pathname="/" header={<SectionHeader isRoot title={`Console`} pathname="/"></SectionHeader>}>
            <div className="space-y-8">
                <div className="grid grid-cols-12 gap-x-4">
                    <Card className="col-span-7">
                        <CardHeader>
                            <CardTitle>
                                {writeLang([
                                    ["en", "Projects"],
                                    ["pt", "Projetos"],
                                ])}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProjectsCard writeLang={writeLang} />
                        </CardContent>
                    </Card>
                    <Card className="col-span-5">
                        <CardHeader>
                            <CardTitle>
                                {writeLang([
                                    ["en", "Users"],
                                    ["pt", "Usuários"],
                                ])}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UsersCard language={language} writeLang={writeLang} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Page>
    );
}

function ProjectsCard({ writeLang }: { writeLang: (texts: [string, React.ReactNode][]) => React.ReactNode }) {
    const [data, setData] = useState<
        {
            name: string;
            progress: number;
        }[]
    >([]);

    async function getData() {
        const request = await new HandleRequest().get(`/dashboard/projects`);

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
        <ResponsiveContainer width="100%" height={200}>
            {data.length ? (
                <ComposedChart layout="vertical" data={data}>
                    <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={20}
                        width={120}
                    />
                    <Bar dataKey="progress" fill="currentColor" radius={[0, 4, 4, 0]} className="fill-primary" />
                </ComposedChart>
            ) : (
                <div className="flex w-full h-full justify-center items-center">
                    <span className="font-medium text-muted-foreground">
                        {writeLang([
                            ["en", "No projects yet."],
                            ["pt", "Nenhum projeto ainda."],
                        ])}
                    </span>
                </div>
            )}
        </ResponsiveContainer>
    );
}

function UsersCard({
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
                            {formatDistance(new Date(item.activated_at), new Date(), {
                                locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                                addSuffix: true,
                            })}
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
