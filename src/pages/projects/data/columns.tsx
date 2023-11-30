import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../../../components/shared/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { Badge } from "../../../components/ui/badge";
import format from "date-fns/format";
import { Project } from "./project";
import { Progress } from "../../../components/ui/progress";
import { cn } from "../../../lib/utils";
import { ClientInfo } from "components/shared/client-info";
import { languages } from "config/languages";
import { Language } from "components/shared/language-provider";
import { Status, statusesColors, statusesIcons } from "./status";

export const projectColumns = (
    language: Pick<Language, "lang" | "locale" | "currency">,
    writeLang: (texts: [string, React.ReactNode][]) => React.ReactNode,
): ColumnDef<Project>[] => {
    return [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Project"],
                            ["pt", "Projeto"],
                        ]) as string
                    }
                    noDislocate
                />
            ),
            cell: ({ row }) => {
                const date: Date = row.original.due;

                const isLate = new Date(date) < new Date() && !["completed", "cancelled"].includes(row.original.status);

                return (
                    <div className="text-left font-medium truncate max-w-[240px]">
                        {isLate && (
                            <Badge variant="outline" className="me-1">
                                {writeLang([
                                    ["en", "overdue"],
                                    ["pt", "atrasado"],
                                ])}
                            </Badge>
                        )}
                        {row.getValue("name")}
                    </div>
                );
            },
        },
        {
            accessorKey: "client.company",
            id: "client",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Client"],
                            ["pt", "Cliente"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                if (!row.original.client) return <></>;
                return <ClientInfo logotipo={row.original.client.logotipo} company={row.original.client.company} />;
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status: Status = row.getValue("status");
                return (
                    <div className={cn("flex items-center space-x-1", statusesColors[status])}>
                        {statusesIcons[status]}
                        <span className="whitespace-nowrap">{status}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "progress",
            enableSorting: false,
            enableColumnFilter: false,
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Progress"],
                            ["pt", "Progresso"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                const totalTasks = row.original.tasks.length;
                const doneTasks = row.original.tasks.filter((item) => ["completed", "cancelled"].includes(item.status)).length;

                return <Progress value={totalTasks / doneTasks} />;
            },
        },
        {
            accessorKey: "due",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Due Date"],
                            ["pt", "Prazo"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                const date: string = row.getValue("due");
                const formatted = format(new Date(date), "PPP", {
                    locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                });

                const isLate = new Date(date) < new Date() && !["completed", "cancelled"].includes(row.original.status);

                return <div className={cn("text-left font-medium", isLate ? "text-red-600" : "")}>{formatted}</div>;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="text-right">
                        <Actions.Edit
                            to={
                                writeLang([
                                    ["en", `/projects/${row.original.id}`],
                                    ["pt", `/projetos/${row.original.id}`],
                                ]) as string
                            }
                        />
                    </div>
                );
            },
        },
    ];
};
