import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../../../components/shared/actions";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { MemberInfo } from "../../../components/shared/member-info";
import { Client } from "./client";
import { ClientInfo } from "components/shared/client-info";

export const clientColumns = (writeLang: (texts: [string, React.ReactNode][]) => React.ReactNode): ColumnDef<Client>[] => {
    return [
        {
            accessorKey: "company",
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={
                        writeLang([
                            ["en", "Company"],
                            ["pt", "Empresa"],
                        ]) as string
                    }
                    noDislocate
                />
            ),
            cell: ({ row }) => {
                return <ClientInfo logotipo={row.original?.logotipo} company={row.original?.company} />;
            },
        },
        {
            accessorKey: "manager",
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
                return <MemberInfo email={row.original.manager.email} name={row.original.manager.name} avatar={row.original.manager.avatar} />;
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
                        <Actions.Delete onClick={() => (row.original as any).deleteAction(row.original)} />
                    </div>
                );
            },
        },
    ];
};
