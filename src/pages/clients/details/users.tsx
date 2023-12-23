import { DataTable } from "../../../components/ui/data-table/data-table";
import { Client } from "../data/client";
import { useLanguage } from "../../../components/shared/language-provider";
import { userColumns } from "../data/user-columns";
import { User } from "config/user";
import { HandleRequest } from "lib/handle-request";
import { BASE_API } from "config/constants";
import { useAuth } from "components/shared/auth-provider";
import { errorToast } from "components/shared/error-toast";
import { toast } from "components/ui/toast/use-toast";

export function ClientUsers({ client }: { client: Client }) {
    const { auth } = useAuth();
    const { language, writeLang } = useLanguage();

    async function inviteUser(item: User) {
        const request = await new HandleRequest({
            email: item.email,
        }).post(`${BASE_API}/users/invite/${item.id}`, {
            token: auth?.token,
        });

        request.onDone(() => {
            toast({
                title: writeLang([
                    ["en", "User has been invited successfully!"],
                    ["pt", "Usuário foi convidado com sucesso!"],
                ]) as string,
            });
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    const users =
        client.users?.map((item) => ({
            ...item,
            reinvite: (item: User) => inviteUser(item),
        })) ?? [];

    return <DataTable columns={userColumns(language, writeLang)} data={users} />;
}
