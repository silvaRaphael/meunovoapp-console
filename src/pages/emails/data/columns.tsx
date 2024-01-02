import { ColumnDef } from "@tanstack/react-table";
import { Email } from "./email";
import { DataTableColumnHeader } from "components/ui/data-table/data-table-column-header";
import { Actions } from "components/shared/actions";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "components/ui/badge";
import { Langs } from "config/languages";

export const emailsColumns = (
    writeLang: (texts: [Langs, React.ReactNode][]) => React.ReactNode,
): ColumnDef<Email>[] => {
    return [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Name"],
                            ["pt", "Nome"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                return (
                    <span className="font-semibold">
                        {row.original.has_reply && (
                            <Badge variant="outline" className="me-2">
                                {writeLang([
                                    ["en", "Replyed"],
                                    ["pt", "Respondido"],
                                ])}
                            </Badge>
                        )}
                        {row.getValue("name")}
                    </span>
                );
            },
        },
        {
            accessorKey: "to",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "To"],
                            ["pt", "Para"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                return <div className="text-left font-medium">{row.getValue("to")}</div>;
            },
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Created At"],
                            ["pt", "Criado Em"],
                        ]) as string
                    }
                />
            ),
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
};
