import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { MemberInfo } from "../../../components/shared/member-info";
import { User } from "config/user";
import { Badge } from "components/ui/badge";

export const userColumns = (writeLang: (texts: [string, React.ReactNode][]) => React.ReactNode): ColumnDef<User>[] => {
    return [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Nome"],
                            ["pt", "Nome"],
                        ]) as string
                    }
                />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex items-center space-x-2">
                        {row.original.is_manager && (
                            <Badge variant="outline" className="h-min">
                                {writeLang([
                                    ["en", "Manager"],
                                    ["pt", "Responsável"],
                                ])}
                            </Badge>
                        )}
                        <MemberInfo name={row.original.name} email={row.original.email} />
                    </div>
                );
            },
        },
    ];
};
