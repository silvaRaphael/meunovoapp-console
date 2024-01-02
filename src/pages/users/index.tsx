import { useEffect, useState } from "react";
import { DataTable } from "../../components/ui/data-table/data-table";
import { SectionHeader } from "../../components/shared/section-header";
import { Page } from "../../components/shared/page";
import { HandleRequest } from "../../lib/handle-request";
import { useLanguage } from "../../components/shared/language-provider";
import { errorToast } from "components/shared/error-toast";
import { useNavigate } from "react-router-dom";
import { userColumns } from "./data/columns";
import { User } from "./data/user";

export function Users() {
    const { language, writeLang } = useLanguage();
    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);

    async function getUsers() {
        const request = await new HandleRequest().get(`/users`, { language });

        request.onDone((response) => {
            setUsers(response);
        });

        request.onError((error) => {
            errorToast(error);
            if (error.redirect) navigate(error.redirect);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getUsers();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Page
            pathname={
                writeLang([
                    ["en", "/users"],
                    ["pt", "/usuarios"],
                ]) as string
            }
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", `Users (${users.length})`],
                            ["pt", `Usuários (${users.length})`],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/users"],
                            ["pt", "/usuarios"],
                        ]) as string
                    }
                ></SectionHeader>
            }
        >
            <DataTable columns={userColumns(language, writeLang)} data={users} />
        </Page>
    );
}
