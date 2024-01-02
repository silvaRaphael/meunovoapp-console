import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header";
import { MemberInfo } from "../../../components/shared/member-info";
import { Badge } from "components/ui/badge";
import { buttonVariants } from "components/ui/button";
import { formatDistance } from "date-fns";
import { Langs, languages } from "config/languages";
import { Language } from "components/shared/language-provider";
import { SubmitButton } from "components/shared/submit-button";
import { cn } from "lib/utils";
import { User } from "pages/users/data/user";
import { Link } from "react-router-dom";
import { Actions } from "components/shared/actions";

export const userColumns = (
    language: Pick<Language, "lang" | "locale" | "currency">,
    writeLang: (texts: [Langs, React.ReactNode][]) => React.ReactNode,
): ColumnDef<User>[] => {
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
                const child = (
                    <div className="flex items-center space-x-4">
                        <MemberInfo avatar={row.original.avatar} email={row.original.email} name={row.original.name} />
                        {row.original.is_manager && (
                            <Badge variant="outline" className="h-min">
                                {writeLang([
                                    ["en", "Manager"],
                                    ["pt", "Responsável"],
                                ])}
                            </Badge>
                        )}
                    </div>
                );

                const link = (
                    <Link
                        to={
                            writeLang([
                                ["en", `/users/${row.original.id}`],
                                ["pt", `/usuarios/${row.original.id}`],
                            ]) as string
                        }
                    >
                        {child}
                    </Link>
                );

                return row.original.activated_at ? link : child;
            },
        },
        {
            id: "invited_actived_time",
            cell: ({ row }) => {
                if (!row.original.activated_at && !row.original.invited_at) return <></>;

                const distanceTime = formatDistance(
                    new Date(row.original.activated_at ?? row.original.invited_at ?? new Date()),
                    new Date(),
                    {
                        locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                        addSuffix: true,
                    },
                );

                return (
                    <>
                        {writeLang([
                            ["en", row.original.activated_at ? "Active " : "Invited "],
                            ["pt", row.original.activated_at ? "Ativo " : "Convidado "],
                        ])}{" "}
                        {distanceTime}
                    </>
                );
            },
        },
        {
            id: "reinvite",
            cell: ({ row }) => {
                if (row.original.activated_at) return <></>;

                return (
                    <div className="text-right">
                        <SubmitButton
                            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "text-text")}
                            label={
                                writeLang([
                                    ["en", `Reinvite user`],
                                    ["pt", `Reconvidar usuário`],
                                ]) as string
                            }
                            onSubmit={() => (row.original as any).inviteAction(row.original)}
                        />
                    </div>
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
                                    ["en", `/users/${row.original.id}`],
                                    ["pt", `/usuarios/${row.original.id}`],
                                ]) as string
                            }
                        />
                    </div>
                );
            },
        },
    ];
};
