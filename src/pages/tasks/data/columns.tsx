import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../../../components/shared/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { AlarmClock, CheckCircle2, Circle, XCircle } from "lucide-react";
import { Status } from "../../projects/data/status";
import { Project } from "../../projects/data/project";
import { Link } from "react-router-dom";
import { Task } from "./task";

export const taskColumns = (writeLang: (texts: [string, React.ReactNode][]) => React.ReactNode): ColumnDef<Task>[] => {
    return [
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
                    noDislocate
                />
            ),
            cell: ({ row }) => {
                return <div className="text-left font-medium truncate max-w-[240px]">{row.getValue("name")}</div>;
            },
        },
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
                />
            ),
            cell: ({ row }) => {
                const project: Project = row.getValue("project");

                return (
                    <Link
                        to={
                            writeLang([
                                ["en", `/projects/${row.original.id}`],
                                ["pt", `/projetos/${row.original.id}`],
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
            accessorKey: "status",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status: Status = row.getValue("status");
                const icons = {
                    waiting: <Circle size={16} className="text-muted-foreground" />,
                    "in progress": <AlarmClock size={16} className="text-muted-foreground" />,
                    completed: <CheckCircle2 size={16} className="text-muted-foreground" />,
                    cancelled: <XCircle size={16} className="text-muted-foreground" />,
                };
                return (
                    <div className="flex items-center space-x-1">
                        {icons[status]}
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
