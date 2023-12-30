import { useNavigate } from "react-router-dom";
import { Mail } from "./components/mail";
import { useEffect, useState } from "react";
import { HandleRequest } from "lib/handle-request";
import { Chat } from "./data/chat";
import { errorToast } from "components/shared/error-toast";
import { MessageUser } from "./data/message";
import { Page } from "components/shared/page";
import { SectionHeader } from "components/shared/section-header";
import { Search } from "components/shared/search";
import { useLanguage } from "components/shared/language-provider";

export function Chats() {
    const { writeLang } = useLanguage();
    const navigate = useNavigate();

    const [chats, setChats] = useState<Chat[]>([]);
    const [contacts, setContacts] = useState<MessageUser[]>([]);

    async function getChats() {
        const request = await new HandleRequest().get(`/chats`);

        request.onDone((response) => {
            setChats(response);
        });

        request.onError((error) => {
            errorToast(error);
            if (error.redirect) navigate(error.redirect);
        });
    }

    async function getContacts() {
        const request = await new HandleRequest().get(`/chats/users`);

        request.onDone((response) => {
            setContacts(response);
        });

        request.onError((error) => {
            errorToast(error);
            if (error.redirect) navigate(error.redirect);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        (async () => Promise.all([getChats(), getContacts()]))();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Page
            pathname="/chat"
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", `Chat (${chats.length})`],
                            ["pt", `Chat (${chats.length})`],
                        ]) as string
                    }
                    pathname="/chat"
                >
                    <Search />
                </SectionHeader>
            }
        >
            <Mail chats={chats} contacts={contacts} />
        </Page>
    );
}
