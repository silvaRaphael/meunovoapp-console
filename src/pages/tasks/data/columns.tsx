import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../../../components/shared/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { Status, statusesColors, statusesIcons } from "../../projects/data/status";
import { Link } from "react-router-dom";
import { Task } from "./task";
import { cn } from "lib/utils";
import { ClientInfo } from "components/shared/client-info";

export const taskColumns = (writeLang: (texts: [string, React.ReactNode][]) => React.ReactNode): ColumnDef<Task>[] => {
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
                console.log(row.original);
                if (!row.original.project.client) return <></>;
                return <ClientInfo id={row.original.project.client.id} logotipo={row.original.project.client.logotipo} company={row.original.project.client.company} />;
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
                            <div className="text-left font-medium truncate max-w-[240px]">{row.original.project.name}</div>
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
                        <span className="whitespace-nowrap">{status}</span>
                    </div>
                );
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
                        {(row.original as any).deleteAction && <Actions.Delete onClick={() => (row.original as any).deleteAction(row.original)} />}
                    </div>
                );
            },
        },
    ];
};
