import { DataTable } from "../../../components/ui/data-table/data-table";
import { Client } from "../data/client";
import { useLanguage } from "../../../components/shared/language-provider";
import { userColumns } from "../data/user-columns";
import { HandleRequest } from "lib/handle-request";
import { errorToast } from "components/shared/error-toast";
import { toast } from "components/ui/toast/use-toast";
import { User } from "pages/users/data/user";

export interface UserRow extends User {
    inviteAction?: (props: User) => any;
}

export function ClientUsers({ client }: { client: Client }) {
    const { language, writeLang } = useLanguage();

    async function inviteUser(item: User) {
        const request = await new HandleRequest({
            email: item.email,
        }).post(`/users/invite/${item.id}`);

        request.onDone(() => {
            toast({
                title: writeLang([
                    ["en", "User has been reinvited successfully!"],
                    ["pt", "Usuário foi reconvidado com sucesso!"],
                ]) as string,
            });
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    const users =
        client.users?.map(
            (item: User): UserRow => ({
                ...item,
                inviteAction: (item) => inviteUser(item),
            }),
        ) ?? [];

    return <DataTable columns={userColumns(language, writeLang)} data={users} />;
}
