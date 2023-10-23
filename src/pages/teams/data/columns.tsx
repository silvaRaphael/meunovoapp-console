import { ColumnDef } from "@tanstack/react-table";
import { Avatar } from "../../../components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Actions } from "../../../components/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { Badge } from "../../../components/ui/badge";
import format from "date-fns/format";
import { MemberInfo } from "../../../components/member-info";
import { Team } from "./team";

export const teamColumns: ColumnDef<Team>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Team" noDislocate />,
        cell: ({ row }) => {
            return <div className="text-left font-medium">{row.getValue("name")}</div>;
        },
    },
    {
        accessorKey: "manager.name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Manager" />,
        cell: ({ row }) => {
            return (
                <MemberInfo
                    avatar={row.original.manager?.avatar}
                    username={row.original.manager?.username}
                    name={row.original.manager?.name}
                    lastName={row.original.manager?.lastName}
                />
            );
        },
    },
    {
        accessorKey: "members",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Members" />,
        enableSorting: false,
        cell: ({ row }) => {
            const membersLength = row.original.members.length;
            const membersLimit = 5;
            const restMembers = membersLength - membersLimit;

            return (
                <div className="flex items-center space-x-1">
                    <div className="col-start-2 row-start-1 row-end-3">
                        <div className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">
                            {row.original.members.slice(0, membersLimit).map((member) => (
                                <Avatar className="h-8 w-8 border-2">
                                    <AvatarImage src={member.avatar} alt={`@${member.username}`} />
                                    <AvatarFallback>{[member.name.charAt(0), member.lastName.charAt(0)].join("").toUpperCase()}</AvatarFallback>
                                </Avatar>
                            ))}
                            {restMembers > 0 && (
                                <Avatar className="h-8 w-8 border-2">
                                    <AvatarFallback className="flex justify-center items-center w-full bg-background">
                                        <span className="text-xs font-semibold">+{restMembers}</span>
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    </div>
                    <Badge variant="outline" className="cursor-pointer" onClick={() => (row.original as any).seeMembers(row.original)}>
                        see all
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "since",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Since" />,
        cell: ({ row }) => {
            const date: Date = row.getValue("since");
            const formatted = format(new Date(date), "PPP");

            return <div className="text-left font-medium">{formatted}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    <Actions.Edit to={`/teams/${row.original.slug}`} />
                    {(row.original as any).deleteAction && <Actions.Delete onClick={() => (row.original as any).deleteAction(row.original)} />}
                </div>
            );
        },
    },
];
