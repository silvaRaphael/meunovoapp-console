import { Separator } from "components/ui/separator";
import { TooltipProvider } from "components/ui/tooltip";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "components/ui/resizable-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { useLanguage } from "components/shared/language-provider";
import { useState } from "react";
import { ContactList } from "./contact-list";
import { MessageUser } from "pages/chat/data/message";
import { Chat } from "pages/chat/data/chat";
import { ChatList } from "./chat-list";
import { ChatDisplay } from "./chat-display";

export function Mail({ chats, contacts }: { chats: Chat[]; contacts: MessageUser[] }) {
    const { writeLang } = useLanguage();

    const [tab, setTab] = useState<string>("chats");
    const [chat, setChat] = useState<Chat | null>(null);
    const [newChat, setMessageUser] = useState<MessageUser | null>(null);

    return (
        <TooltipProvider delayDuration={0}>
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
                                setMessageUser={setMessageUser}
                                setTab={setTab}
                            />
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={60} minSize={40} className="border border-l-0 rounded-tr-md rounded-br-md">
                    <ChatDisplay chat={chat} newChat={newChat} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}
