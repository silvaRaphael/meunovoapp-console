import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { Page } from "../../../components/shared/page";
import { User } from "../data/user";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/shared/language-provider";
import { errorToast } from "components/shared/error-toast";
import { UserForm } from "./form";

export function UserDetails() {
    const { language, writeLang } = useLanguage();
    const { id } = useParams();

    const [user, setUser] = useState<User>();

    async function getUser(id?: string) {
        const request = await new HandleRequest().get(`/users/${id}`, { language });

        request.onDone((response) => {
            setUser(response);
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getUser(id);

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!user) return <></>;

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
                            ["en", "Users"],
                            ["pt", "Usuários"],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/users"],
                            ["pt", "/usuarios"],
                        ]) as string
                    }
                    tree={!!user ? [{ label: user.name }] : []}
                ></SectionHeader>
            }
        >
            <UserForm user={user} />
        </Page>
    );
}
