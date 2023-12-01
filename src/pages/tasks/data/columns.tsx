import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../../../components/shared/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { Status, statusesColors, statusesIcons } from "../../projects/data/status";
import { Project } from "../../projects/data/project";
import { Link } from "react-router-dom";
import { Task } from "./task";
import { cn } from "lib/utils";

export const taskColumns = (writeLang: (texts: [string, React.ReactNode][]) => React.ReactNode): ColumnDef<Task>[] => {
    return [
        {
            accessorKey: "project",
            enableHiding: true,
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
                    noDislocate
                />
            ),
            cell: ({ row }) => {
                const project: Project = row.getValue("project");

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
                            <div className="text-left font-medium truncate max-w-[240px]">{project.name}</div>
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
                return <div className="text-left font-medium truncate max-w-[240px]">{row.getValue("name")}</div>;
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
