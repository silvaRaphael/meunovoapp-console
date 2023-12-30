import format from "date-fns/format";
import { buttonVariants } from "components/ui/button";
import { Separator } from "components/ui/separator";
import { Textarea } from "components/ui/textarea";
import { useLanguage } from "components/shared/language-provider";
import { MemberInfo } from "components/shared/member-info";
import { languages } from "config/languages";
import { SubmitButton } from "components/shared/submit-button";
import { cn } from "lib/utils";
import { useForm } from "react-hook-form";
import { CreateMessageSchema, createMessageSchema } from "adapters/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "components/ui/form";
import { GetMessageLabel, Message, MessageLabel, MessageUser, messageLabelTypes } from "pages/chat/data/message";
import { Badge } from "components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { Chat } from "pages/chat/data/chat";
import { formatDistanceToNow } from "date-fns";
import { Loader } from "lucide-react";
import { HandleRequest } from "lib/handle-request";
import { errorToast } from "components/shared/error-toast";
import { useNavigate } from "react-router-dom";
import { useUserData } from "components/shared/user-data-provider";
import { v4 as v4UUID } from "uuid";
import { socket } from "./websocket";

export function ChatDisplay({ chat, newChat }: { chat: Chat | null; newChat: MessageUser | null }) {
    const { userData } = useUserData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!chat) return;

        socket.emit("getMessages", chat.id);

        socket.on("error", (error) => {
            errorToast(error);
            if (error.redirect) navigate(error.redirect);
        });

        return () => {
            socket.off("error");
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat]);

    return (
        <div className="flex h-full flex-col">
            {chat ? (
                <MailContent chat={chat} />
            ) : (
                newChat &&
                userData && (
                    <MailContent
                        chat={{
                            id: v4UUID(),
                            user: {
                                name: userData.name,
                                email: userData.email,
                                avatar: userData.avatar,
                                is_manager: false,
                            } as MessageUser,
                            participant: newChat,
                        }}
                    />
                )
            )}
        </div>
    );
}

const MailContent = ({ chat }: { chat: Chat }) => {
    const { language, writeLang } = useLanguage();
    const navigate = useNavigate();

    const [messages, setMessages] = useState<Message[] | null>(null);

    const addMessage = (message: Message, messages?: Message[]) => {
        setMessages([...(messages ?? []), message]);
    };

    const sendMessage = (message: Message) => {
        socket.emit("createMessage", message);

        addMessage(message, messages ?? []);
    };

    const markAsReadMessage = (message: Message) => {
        if (message.user.email === chat?.user.email) return;

        socket.emit("markAsRead", message);
    };

    useEffect(() => {
        socket.on("messages", (response: any) => {
            setMessages(
                response.map((item: Message) => {
                    markAsReadMessage(item);
                    return item;
                }),
            );
        });

        socket.on("message", (response: Message) => {
            addMessage(response, messages || []);
        });

        socket.on("messageRead", (response: Message) => {
            setMessages(
                [...(messages ?? [])].map((item: Message) => {
                    if (item.id === response.id) return response;

                    return item;
                }),
            );
        });

        socket.on("error", (error) => {
            errorToast(error);
            if (error.redirect) navigate(error.redirect);
        });

        return () => {
            socket.off("error");
            socket.off("messages");
            socket.off("message");
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex items-start p-4 py-2 gap-x-2">
                <MemberInfo
                    avatar={chat.participant.avatar}
                    email={chat.participant.email}
                    name={chat.participant.name}
                    isManager={chat.participant.is_manager}
                />
                {chat.last_message?.date && (
                    <div className="ml-auto text-xs text-muted-foreground text-end">
                        <span className="me-1">
                            {writeLang([
                                ["en", "Last message in"],
                                ["pt", "Última mensagem em"],
                            ])}
                        </span>
                        {chat.last_message?.date &&
                            format(new Date(chat.last_message?.date), "PPp", {
                                locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                            })}
                    </div>
                )}
            </div>
            <Separator />
            <MessageList items={messages} chat={chat} />
            <Separator className="mt-auto" />
            <MailFooter chat={chat} sendMessage={sendMessage} name={chat.participant.name} />
        </div>
    );
};

const MessageList = ({ items, chat }: { items: Message[] | null; chat: Chat }) => {
    const { language, writeLang } = useLanguage();

    const scrollRef = useRef<HTMLDivElement>(null);

    const locale = languages.find((item) => item.lang === language.lang)?.dateLocale;

    useEffect(() => {
        const domNode = scrollRef.current;
        if (domNode) {
            domNode.scrollTop = domNode.scrollHeight;
        }
    }, [items]);

    return (
        <div
            className="flex flex-col h-full gap-2 p-2 overflow-y-auto vertical-scrollbar"
            style={{
                height: window.screen.availHeight - 46 - 80 - 52 - 16 - 16 - 40 - 90 - 140,
            }}
            ref={scrollRef}
        >
            {items ? (
                items.length ? (
                    items?.map((item, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex flex-col items-start gap-3 rounded-lg border p-3 text-left text-sm transition-all w-5/6",
                                item.user.email === chat.user.email ? "bg-accent/25 ml-auto" : "",
                            )}
                        >
                            <div className="flex w-full flex-col gap-1">
                                <div className="flex items-center gap-x-2">
                                    <MemberInfo
                                        avatar={item.user.avatar}
                                        email={item.user.email}
                                        name={item.user.name}
                                        isManager={item.user.is_manager}
                                    />
                                    <div
                                        className={cn(
                                            "flex items-center ml-auto text-xs text-end",
                                            item.user.email === chat.user.email
                                                ? "text-foreground"
                                                : "text-muted-foreground",
                                        )}
                                    >
                                        {!item.read && item.user.email === chat.user.email && (
                                            <span className="flex h-2 w-2 rounded-full me-2 bg-blue-600" />
                                        )}
                                        {item.date &&
                                            formatDistanceToNow(new Date(item.date), {
                                                locale,
                                                addSuffix: true,
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className="whitespace-pre-wrap text-xs">{item.text}</div>
                            {item.labels.length ? (
                                <div className="flex items-center gap-2">
                                    {item.labels.map((label) => (
                                        <Badge
                                            key={label}
                                            variant={item.user.email === chat.user.email ? "secondary" : "secondary"}
                                        >
                                            {label}
                                        </Badge>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <div className="flex w-full h-full justify-center items-center">
                        <span className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "No messages yet."],
                                ["pt", "Nenhuma mensagem ainda."],
                            ])}
                        </span>
                    </div>
                )
            ) : (
                <div className="flex w-full h-full justify-center items-center">
                    <Loader size={16} className="animate-spin me-1" />
                </div>
            )}
        </div>
    );
};

const MailFooter = ({
    chat,
    name,
    sendMessage,
}: {
    chat: Chat;
    name: string;
    sendMessage: (message: Message) => void;
}) => {
    const { writeLang } = useLanguage();
    const navigate = useNavigate();

    const [labels, setLabels] = useState<MessageLabel[]>([]);

    const form = useForm<CreateMessageSchema>({
        resolver: zodResolver(createMessageSchema),
        defaultValues: {
            chat_id: chat?.id ?? undefined,
        },
        mode: "onChange",
    });

    async function onSubmit(data: CreateMessageSchema) {
        const request = await new HandleRequest({
            chat_id: chat.id,
            text: data.text,
            labels,
            receiver_id: chat.participant.id,
        }).post(`/messages`);

        request.onError((error) => {
            errorToast(error);
            if (error.redirect) navigate(error.redirect);
        });

        sendMessage({
            chat_id: chat?.id,
            date: new Date(),
            id: new Date().getTime().toString(),
            labels,
            read: false,
            text: data.text,
            user: {
                name: chat.user.name,
                email: chat.user.email,
                avatar: chat.user.avatar,
                is_manager: chat.user.is_manager,
            },
        });

        form.reset({
            chat_id: chat.id,
            text: "",
        });

        setLabels([]);
    }

    return (
        <Form {...form}>
            <form className="p-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem className="text-end">
                                <FormControl>
                                    <Textarea
                                        className="p-2 resize-none"
                                        placeholder={`${writeLang([
                                            ["en", "Reply"],
                                            ["pt", "Responder"],
                                        ])} ${name}...`}
                                        rows={2}
                                        maxLength={500}
                                        onKeyUp={(e) => {
                                            if (e.ctrlKey && e.key === "Enter") onSubmit(form.getValues());
                                        }}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    <span className="ms-0">
                                        {(form.getValues().text?.length ?? 0).toString()}/500 -{" "}
                                    </span>
                                    {writeLang([
                                        ["en", "Ctrl+Enter to send"],
                                        ["pt", "Ctrl+Enter para enviar"],
                                    ])}
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center">
                        <div className="flex space-x-2">
                            {messageLabelTypes.map((item, i) => (
                                <Badge
                                    key={i}
                                    variant={labels.find((label) => label === item) ? "secondary" : "outline"}
                                    onClick={() => {
                                        const contains = labels.find((label) => label === item);
                                        setLabels(
                                            !contains ? [...labels, item] : labels.filter((label) => label !== item),
                                        );
                                    }}
                                    className="cursor-pointer select-none"
                                >
                                    <GetMessageLabel messageLabel={item} />
                                </Badge>
                            ))}
                        </div>
                        <SubmitButton
                            label={
                                writeLang([
                                    ["en", "Send"],
                                    ["pt", "Enviar"],
                                ]) as string
                            }
                            className={cn("ml-auto", buttonVariants({ size: "sm" }))}
                            type="submit"
                            state={form.formState.isSubmitting ? "loading" : "initial"}
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
};
