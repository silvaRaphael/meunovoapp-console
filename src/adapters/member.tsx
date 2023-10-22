import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../components/actions";
import { DataTableColumnHeader } from "../components/ui/data-table/data-table-column-header";
import { JobTitle } from "./job-title";
import { Badge } from "../components/ui/badge";
import { MemberInfo } from "../components/member-info";
import { Role } from "../config/roles";
import { UpperFirst } from "../lib/helper";

export interface Member {
    id: string;
    username: string;
    email: string;
    name: string;
    lastName: string;
    avatar?: string;
    jobTitle: JobTitle;
    role: Role;
    bio: string;
    since: Date;
}

export const memberColumns: ColumnDef<Member>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Member" />,
        cell: ({ row }) => {
            return <MemberInfo avatar={row.original?.avatar} username={row.original?.username} name={row.original?.name} lastName={row.original?.lastName} />;
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        cell: ({ row }) => {
            return <div className="text-left font-medium">{row.getValue("email")}</div>;
        },
    },
    {
        accessorKey: "jobTitle",
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Job Title" />,
        cell: ({ row }) => {
            const jobTitle: JobTitle = row.getValue("jobTitle");
            return (
                <div className="flex items-center">
                    <Badge variant="outline">{jobTitle.name}</Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "role",
        enableSorting: false,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        cell: ({ row }) => {
            const role: Role = row.getValue("role");
            return (
                <div className="flex items-center">
                    <Badge variant="outline">{UpperFirst(role)}</Badge>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    <Actions.Edit to={`/members/@${row.original.username}`} />
                    <Actions.Delete onClick={() => (row.original as any).deleteAction(row.original)} />
                </div>
            );
        },
    },
];
