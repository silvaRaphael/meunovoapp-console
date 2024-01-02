import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../../../components/shared/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { GetStatus, Status, statusesColors, statusesIcons } from "../../projects/data/status";
import { Link } from "react-router-dom";
import { Task } from "./task";
import { cn } from "lib/utils";
import { ClientInfo } from "components/shared/client-info";
import { format } from "date-fns";
import { Langs, languages } from "config/languages";
import { Language } from "components/shared/language-provider";

export const taskColumns = (
    language: Pick<Language, "lang" | "locale" | "currency">,
    writeLang: (texts: [Langs, React.ReactNode][]) => React.ReactNode,
): ColumnDef<Task>[] => {
    return [
        {
            accessorKey: "project.client.name",
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
                if (!row.original.project.client) return <></>;
                return (
                    <ClientInfo
                        id={row.original.project.client.id}
                        logotipo={row.original.project.client.logotipo}
                        company={row.original.project.client.company}
                    />
                );
            },
        },
        {
            accessorKey: "project.name",
            id: "project",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Project"],
                            ["pt", "Projeto"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                return (
                    <Link
                        to={
                            writeLang([
                                ["en", `/projects/${row.original.project.id}`],
                                ["pt", `/projetos/${row.original.project.id}`],
                            ]) as string
                        }
                    >
                        <div className="flex item-center space-x-1">
                            <div className="text-left font-medium truncate max-w-[240px]">
                                {row.original.project.name}
                            </div>
                        </div>
                    </Link>
                );
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Task"],
                            ["pt", "Tarefa"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                return (
                    <Link
                        to={
                            writeLang([
                                ["en", `/tasks/${row.original.id}`],
                                ["pt", `/tarefas/${row.original.id}`],
                            ]) as string
                        }
                    >
                        <div className="text-left font-medium truncate max-w-[240px]">{row.getValue("name")}</div>
                    </Link>
                );
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
                        <span className="whitespace-nowrap">
                            <GetStatus status={status} />
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: "startDate",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Start Date"],
                            ["pt", "Início"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                const date: string = row.getValue("startDate");
                const formatted = date
                    ? format(new Date(date), "PPP", {
                          locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                      })
                    : "";

                return <div className="text-left font-medium">{formatted}</div>;
            },
        },
        {
            accessorKey: "endDate",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "End Date"],
                            ["pt", "Término"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                const date: string = row.getValue("endDate");
                const formatted = date
                    ? format(new Date(date), "PPP", {
                          locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                      })
                    : "";

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
                                    ["en", `/tasks/${row.original.id}`],
                                    ["pt", `/tarefas/${row.original.id}`],
                                ]) as string
                            }
                        />
                        {(row.original as any).deleteAction && (
                            <Actions.Delete onClick={() => (row.original as any).deleteAction(row.original)} />
                        )}
                    </div>
                );
            },
        },
    ];
};
