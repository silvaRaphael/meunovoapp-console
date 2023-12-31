import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Separator } from "components/ui/separator";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "components/ui/resizable-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { useLanguage } from "components/shared/language-provider";
import { HandleRequest } from "lib/handle-request";
import { Chat } from "./data/chat";
import { errorToast } from "components/shared/error-toast";
import { MessageUser } from "./data/message";
import { Page } from "components/shared/page";
import { SectionHeader } from "components/shared/section-header";
import { ContactList } from "./components/contact-list";
import { ChatList } from "./components/chat-list";
import { ChatDisplay } from "./components/chat-display";

export function Chats() {
    const { writeLang } = useLanguage();
    const navigate = useNavigate();

    const [chats, setChats] = useState<Chat[]>([]);
    const [contacts, setContacts] = useState<MessageUser[]>([]);
    const [tab, setTab] = useState<string>("chats");
    const [chat, setChat] = useState<Chat | null>(null);
    const [newChat, setMessageUser] = useState<MessageUser | null>(null);

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
                    {/* <Search /> */}
                </SectionHeader>
            }
        >
            <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
                <ResizablePanel defaultSize={40} minSize={40} className="border border-r-0 rounded-tl-md rounded-bl-md">
                    <Tabs defaultValue="chats" value={tab} onValueChange={setTab}>
                        <div className="flex items-center px-2 py-2">
                            <TabsList>
                                <TabsTrigger value="chats">Chats</TabsTrigger>
                                <TabsTrigger value="contacts">
                                    {writeLang([
                                        ["en", "Contacts"],
                                        ["pt", "Contatos"],
                                    ])}
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <Separator />
                        <TabsContent value="chats" className="m-0">
                            <ChatList items={chats} chat={chat} setChat={setChat} />
                        </TabsContent>
                        <TabsContent value="contacts" className="m-0">
                            <ContactList
                                items={contacts}
                                chats={chats}
                                setChat={setChat}
                                setChats={setChats}
                                setMessageUser={setMessageUser}
                                setTab={setTab}
                            />
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={60} minSize={40} className="border border-l-0 rounded-tr-md rounded-br-md">
                    {!!chat || !!newChat ? (
                        <ChatDisplay chat={chat} newChat={newChat} chats={chats} setChats={setChats} />
                    ) : (
                        <div className="flex h-full flex-col">
                            <div className="flex justify-center items-center h-full p-8 text-center text-muted-foreground">
                                {writeLang([
                                    ["en", "No chat selected."],
                                    ["pt", "Nenhum chat selecionado."],
                                ])}
                            </div>
                        </div>
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
        </Page>
    );
}
