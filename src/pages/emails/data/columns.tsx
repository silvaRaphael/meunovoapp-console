import { ColumnDef } from "@tanstack/react-table";
import { Email } from "./email";
import { DataTableColumnHeader } from "components/ui/data-table/data-table-column-header";
import { Actions } from "components/shared/actions";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const emailsColumns: ColumnDef<Email>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" noDislocate />,
        cell: ({ row }) => {
            return <span className="font-semibold">{row.getValue("name")}</span>;
        },
    },
    {
        accessorKey: "to",
        header: ({ column }) => <DataTableColumnHeader column={column} title="To" />,
        cell: ({ row }) => {
            return <div className="text-left font-medium">{row.getValue("to")}</div>;
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
        cell: ({ row }) => {
            const date: string = row.getValue("created_at");
            const formatedDate = format(new Date(date), "PPP", {
                locale: ptBR,
            });
            return <div className="text-left font-medium">{formatedDate}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    <Actions.Edit to={`/emails/${row.original.id}`} />
                </div>
            );
        },
    },
];
