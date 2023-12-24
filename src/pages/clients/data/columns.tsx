import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../../../components/shared/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { MemberInfo } from "../../../components/shared/member-info";
import { Client } from "./client";
import { ClientInfo } from "components/shared/client-info";
import { Button } from "components/ui/button";
import { Badge } from "components/ui/badge";
import { Link } from "react-router-dom";

export const clientColumns = (
    writeLang: (texts: [string, React.ReactNode][]) => React.ReactNode,
): ColumnDef<Client>[] => {
    return [
        {
            accessorKey: "client",
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
                return (
                    <ClientInfo id={row.original.id} logotipo={row.original.logotipo} company={row.original.company} />
                );
            },
        },
        {
            accessorKey: "users",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Manager"],
                            ["pt", "Responsável"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                if (!row.original.users?.length)
                    return (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => (row.original as any).inviteAction(row.original)}
                        >
                            {writeLang([
                                ["en", "Invite"],
                                ["pt", "Convidar"],
                            ])}
                        </Button>
                    );
                return (
                    <Link
                        to={
                            writeLang([
                                ["en", `/users/${row.original.users[0].id}`],
                                ["pt", `/usuarios/${row.original.users[0].id}`],
                            ]) as string
                        }
                    >
                        <div className="flex items-center space-x-2">
                            {!row.original.users[0].name && (
                                <Badge variant="outline" className="h-min">
                                    {writeLang([
                                        ["en", "Invited"],
                                        ["pt", "Convidado"],
                                    ])}
                                </Badge>
                            )}
                            <MemberInfo
                                avatar={row.original.users[0].avatar}
                                email={row.original.users[0].email}
                                name={row.original.users[0].name}
                            />
                        </div>
                    </Link>
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
                                    ["en", `/clients/${row.original.id}`],
                                    ["pt", `/clientes/${row.original.id}`],
                                ]) as string
                            }
                        />
                    </div>
                );
            },
        },
    ];
};
