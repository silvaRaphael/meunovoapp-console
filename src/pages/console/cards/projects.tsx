import { errorToast } from "components/shared/error-toast";
import { HandleRequest } from "lib/handle-request";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function ProjectsCard({ writeLang }: { writeLang: (texts: [string, React.ReactNode][]) => React.ReactNode }) {
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
                <BarChart layout="vertical" data={data}>
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
                </BarChart>
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
