import { MemberInfo } from "components/shared/member-info";
import { cn } from "lib/utils";
import { MessageUser } from "pages/chat/data/message";
import { Chat } from "pages/chat/data/chat";

interface ContactListProps {
    items: MessageUser[];
    chats: Chat[];
    setChat: React.Dispatch<React.SetStateAction<Chat | null>>;
    setMessageUser: React.Dispatch<React.SetStateAction<MessageUser | null>>;
    setTab: React.Dispatch<React.SetStateAction<string>>;
}

export function ContactList({ items, chats, setChat, setMessageUser, setTab }: ContactListProps) {
    return (
        <div
            className="h-full overflow-y-auto vertical-scrollbar"
            style={{
                maxHeight: window.screen.availHeight - 46 - 80 - 52 - 16 - 16 - 40 - 90,
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

                            setChat(null);
                            setMessageUser({
                                id: item.id,
                                name: item.name,
                                email: item.email,
                                avatar: item.avatar,
                                is_manager: item.is_manager,
                            });
                            // setTab("chats");
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
