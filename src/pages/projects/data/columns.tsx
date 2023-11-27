import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../../../components/shared/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { Badge } from "../../../components/ui/badge";
import format from "date-fns/format";
import { MemberInfo } from "../../../components/shared/member-info";
import { Project } from "./project";
import { Progress } from "../../../components/ui/progress";
import { AlarmClock, ArrowDown, ArrowRight, ArrowUp, CheckCircle2, Circle } from "lucide-react";
import { Status } from "./status";
import { Priority, priorities } from "./priority";
import { cn } from "../../../lib/utils";

export const projectColumns: ColumnDef<Project>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Project" noDislocate />,
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
        accessorKey: "manager.name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Manager" />,
        cell: ({ row }) => {
            return <MemberInfo avatar={row.original.manager.manager.avatar} name={row.original.manager.manager.name} email={row.original.manager.manager.email} />;
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
                    <span className="whitespace-nowrap">{status}</span>
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
                    <span className="whitespace-nowrap">{priorities[priority]}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "progress",
        enableSorting: false,
        enableColumnFilter: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Progress" />,
        cell: ({ row }) => {
            const title: string = row.getValue("title");
            const status = row.original.status;
            const progress = status === "waiting" ? 0 : status === "completed" ? 100 : title.length;

            return <Progress value={progress} />;
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
                    <Actions.Edit to={`/projects/${row.original.id}`} />
                    {(row.original as any).deleteAction && <Actions.Delete onClick={() => (row.original as any).deleteAction(row.original)} />}
                </div>
            );
        },
    },
];
