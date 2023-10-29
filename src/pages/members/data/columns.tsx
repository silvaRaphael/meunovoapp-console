import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../../../components/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { Badge } from "../../../components/ui/badge";
import { MemberInfo } from "../../../components/member-info";
import { Role } from "../../../config/roles";
import { UpperFirst } from "../../../lib/helper";
import { Member } from "./member";
import { JobTitle } from "../../../config/job-titles";

export const memberColumns: ColumnDef<Member>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Member" noDislocate />,
        cell: ({ row }) => {
            return (
                <MemberInfo
                    avatar={row.original?.avatar}
                    username={row.original?.username}
                    name={row.original?.name}
                    lastName={row.original?.lastName}
                    email={row.original?.email}
                    jobTitle={row.original?.jobTitle.name}
                    since={row.original?.since}
                />
            );
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
