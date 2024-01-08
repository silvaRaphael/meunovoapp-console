import { v4 as v4UUID } from "uuid";
import { MemberInfo } from "components/shared/member-info";
import { cn } from "lib/utils";
import { MessageUser } from "pages/chat/data/message";
import { Chat } from "pages/chat/data/chat";
import { useUserData } from "components/shared/user-data-provider";
import { useLanguage } from "components/shared/language-provider";

export function ContactList({
    items,
    chats,
    setChat,
    setChats,
    setTab,
    setIsCollapsed,
}: {
    items: MessageUser[];
    chats: Chat[];
    setChat: React.Dispatch<React.SetStateAction<Chat | null>>;
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    setTab: React.Dispatch<React.SetStateAction<string>>;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { userData } = useUserData();
    const { writeLang } = useLanguage();

    return (
        <div
            className="h-full overflow-y-auto vertical-scrollbar"
            style={{
                height: window.screen.availHeight - 46 - 80 - 52 - 16 - 16 - 40 - 90,
            }}
        >
            {!!items.length ? (
                <div className="flex flex-col h-full gap-2 p-2">
                    {items.map((item, i) => (
                        <button
                            key={i}
                            className={cn(
                                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                            )}
                            onClick={() => {
                                const chatsExistent = chats.find((chat) => chat.participant.id === item.id);

                                if (chatsExistent) {
                                    setChat(chatsExistent);
                                    setIsCollapsed(true);
                                    setTab("chats");
                                    return;
                                }

                                if (!userData) return;

                                const chat: Chat = {
                                    id: v4UUID(),
                                    participant: {
                                        id: item.id,
                                        name: item.name,
                                        email: item.email,
                                        avatar: item.avatar,
                                        is_manager: item.is_manager,
                                    },
                                    user: {
                                        name: userData.name,
                                        email: userData.email,
                                        avatar: userData.avatar,
                                        is_manager: false,
                                    },
                                };

                                setChat(chat);
                                setChats([...chats, chat]);
                                setIsCollapsed(true);
                                setTab("chats");
                            }}
                        >
                            <MemberInfo
                                avatar={item.avatar}
                                email={item.email}
                                name={item.name}
                                isManager={item.is_manager}
                            />
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex h-full flex-col">
                    <div className="flex justify-center items-center h-[calc(100%-52px)] p-8 text-center text-muted-foreground">
                        {writeLang([
                            ["en", "No contacts."],
                            ["pt", "Nenhum contato."],
                        ])}
                    </div>
                </div>
            )}
        </div>
    );
}
