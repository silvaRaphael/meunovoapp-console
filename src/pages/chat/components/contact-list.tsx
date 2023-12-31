import { v4 as v4UUID } from "uuid";
import { MemberInfo } from "components/shared/member-info";
import { cn } from "lib/utils";
import { MessageUser } from "pages/chat/data/message";
import { Chat } from "pages/chat/data/chat";
import { useUserData } from "components/shared/user-data-provider";

export function ContactList({
    items,
    chats,
    setChat,
    setChats,
    setMessageUser,
    setTab,
}: {
    items: MessageUser[];
    chats: Chat[];
    setChat: React.Dispatch<React.SetStateAction<Chat | null>>;
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    setMessageUser: React.Dispatch<React.SetStateAction<MessageUser | null>>;
    setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { userData } = useUserData();

    return (
        <div
            className="h-full overflow-y-auto vertical-scrollbar"
            style={{
                height: window.screen.availHeight - 46 - 80 - 52 - 16 - 16 - 40 - 90,
            }}
        >
            <div className="flex flex-col h-full gap-2 p-2">
                {items.map((item, i) => (
                    <button
                        key={i}
                        className={cn(
                            "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                        )}
                        onClick={() => {
                            const chatsExistent = chats.find((mail) => mail.participant.email === item.email);

                            if (chatsExistent) {
                                setChat(chatsExistent);
                                setTab("chats");
                                return;
                            }

                            if (!userData) return;

                            // setChat(null);
                            const chat = {
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
                            // setMessageUser({
                            //     id: item.id,
                            //     name: item.name,
                            //     email: item.email,
                            //     avatar: item.avatar,
                            //     is_manager: item.is_manager,
                            // });
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
        </div>
    );
}
