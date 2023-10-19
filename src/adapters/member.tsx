import { ColumnDef } from "@tanstack/react-table";
import { Avatar } from "../components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Checkbox } from "../components/ui/checkbox";
import { actions } from "../components/actions";
import { DataTableColumnHeader } from "../components/ui/data-table/data-table-column-header";
import { Role } from "./roles";
import { Badge } from "../components/ui/badge";

export interface Member {
    id: string;
    username: string;
    email: string;
    name: string;
    lastName: string;
    avatar: string;
    role: Role;
    bio: string;
    since: Date;
}

export const memberColumns: ColumnDef<Member>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={table.getIsAllPageRowsSelected()}
    //             onCheckedChange={(value) =>
    //                 table.toggleAllPageRowsSelected(!!value)
    //             }
    //             aria-label="Select all"
    //             className="translate-y-[2px]"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //             className="translate-y-[2px]"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Member" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8 border">
                        <AvatarImage
                            src={row.original?.avatar}
                            alt={`@${row.original.username}`}
                        />
                        <AvatarFallback>
                            {[
                                row.original.name.charAt(0),
                                row.original.lastName.charAt(0),
                            ]
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-left text-sm font-medium">
                            {row.original.name} {row.original.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            @{row.original.username}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            return (
                <div className="text-left font-medium">
                    {row.getValue("email")}
                </div>
            );
        },
    },
    {
        accessorKey: "role",
        enableSorting: false,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => {
            const role: Role = row.getValue("role");
            return (
                <div className="flex items-center">
                    <Badge variant="outline">{role.title}</Badge>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="text-right">
                <actions.Edit to={`/members/@${row.original.username}`} />
                <actions.Delete />
            </div>
        ),
    },
];
