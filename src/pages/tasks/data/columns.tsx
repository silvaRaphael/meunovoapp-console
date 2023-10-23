import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../../../components/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { Badge } from "../../../components/ui/badge";
import format from "date-fns/format";
import { AlarmClock, ArrowDown, ArrowRight, ArrowUp, CheckCircle2, Circle } from "lucide-react";
import { Status } from "../../projects/data/status";
import { Priority, priorities } from "../../projects/data/priority";
import { cn } from "../../../lib/utils";
import { Task } from "./task";
import { Project } from "../../projects/data/project";
import { Link } from "react-router-dom";

export const taskColumns: ColumnDef<Task>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Task" noDislocate />,
        cell: ({ row }) => {
            const date: Date = row.original.due;

            const isLate = new Date(date) < new Date() && row.original.status !== "completed";

            return (
                <div className="text-left font-medium truncate max-w-[240px]">
                    {isLate && (
                        <Badge variant="outline" className="me-1">
                            overdue
                        </Badge>
                    )}
                    {row.getValue("title")}
                </div>
            );
        },
    },
    {
        accessorKey: "project",
        enableHiding: true,
        id: "project",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Project" />,
        cell: ({ row }) => {
            const project: Project = row.getValue("project");

            return (
                <div className="flex item-center space-x-1">
                    <div className="text-left font-medium truncate max-w-[240px]">{project.title}</div>
                    <Badge variant="outline">
                        <Link to={`/projects/${project.id}`}>see</Link>
                    </Badge>
                </div>
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
            };
            return (
                <div className="flex items-center space-x-1">
                    {icons[status]}
                    <span>{status}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
        cell: ({ row }) => {
            const priority: Priority = row.getValue("priority");
            const icons = [
                <ArrowUp size={16} className="text-muted-foreground" />,
                <ArrowRight size={16} className="text-muted-foreground" />,
                <ArrowDown size={16} className="text-muted-foreground" />,
            ];
            return (
                <div className="flex items-center space-x-1">
                    {icons[priority]}
                    <span>{priorities[priority]}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "due",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
        cell: ({ row }) => {
            const date: string = row.getValue("due");
            const formatted = format(new Date(date), "PPP");

            const isLate = new Date(date) < new Date() && row.original.status !== "completed";

            return <div className={cn("text-left font-medium", isLate ? "text-red-600" : "")}>{formatted}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    <Actions.Edit to={`/tasks/${row.original.id}`} />
                    {(row.original as any).deleteAction && <Actions.Delete onClick={() => (row.original as any).deleteAction(row.original)} />}
                </div>
            );
        },
    },
];
