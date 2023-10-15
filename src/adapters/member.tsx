import { ColumnDef } from "@tanstack/react-table";
import { Avatar } from "../components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { actions } from "../components/actions";

export interface Member {
    id: string;
    username: string;
    email: string;
    name: string;
    lastName: string;
    avatar: string;
    bio: string;
    since: Date;
}

export const memberColumns: ColumnDef<Member>[] = [
    {
        accessorKey: "select",
        header: () => (
            <div className="text-left">
                <Checkbox />
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="text-left">
                    <Checkbox />
                </div>
            );
        },
    },
    {
        accessorKey: "member",
        header: () => (
            <div className="text-left text-sm font-semibold">Member</div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <Avatar className="h-8 w-8 me-2 border">
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
        header: () => (
            <div className="text-left text-sm font-semibold">Email</div>
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
        accessorKey: "status",
        header: () => (
            <div className="text-center text-sm font-semibold">Status</div>
        ),
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    <Badge variant="outline">active</Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "since",
        header: () => (
            <div className="text-center text-sm font-semibold">Since</div>
        ),
        cell: ({ row }) => {
            const formatted = Intl.DateTimeFormat("pt-BR", {
                dateStyle: "medium",
            }).format(new Date(row.original.since));
            return <div className="text-center font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "actions",
        header: () => null,
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    <actions.Edit to={`/members/${row.original.id}`} />
                    <actions.Delete />
                </div>
            );
        },
    },
];
