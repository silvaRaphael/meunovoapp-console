import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../../../components/shared/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { Template } from "./template";
import { Langs } from "config/languages";

export const templateColumns = (
    writeLang: (texts: [Langs, React.ReactNode][]) => React.ReactNode,
): ColumnDef<Template>[] => {
    return [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Template"],
                            ["pt", "Modelo"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                return row.original.name;
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
                                    ["en", `/templates/${row.original.id}`],
                                    ["pt", `/modelos/${row.original.id}`],
                                ]) as string
                            }
                        />
                    </div>
                );
            },
        },
    ];
};
