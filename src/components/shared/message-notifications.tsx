import { Button, buttonVariants } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "./language-provider";
import { languages } from "config/languages";
import { cn } from "lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Message } from "pages/chat/data/message";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";

export function MessageNotifications({ messages }: { messages: Message[] }) {
    const { language, writeLang } = useLanguage();

    const [open, onOpenChange] = useState<boolean>(false);
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        let currentTime: any;

        if (open) {
            currentTime = setInterval(() => {
                setTime(new Date());
            }, 1000);
        }

        return () => {
            clearInterval(currentTime);
            setTime(null);

            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const messagesLength = messages?.length ?? 0;

    return (
        <Tooltip>
            <DropdownMenu open={open} onOpenChange={onOpenChange}>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="relative p-2">
                            <MessageCircle size={16} />
                            {messagesLength > 0 && (
                                <div className="absolute top-[4px] right-[6px] w-[5px] h-[5px] rounded-full bg-neutral-950 dark:bg-neutral-50"></div>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <DropdownMenuContent className="w-60" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {writeLang([
                                    [
                                        "en",
                                        `Welcome, ${format(time ?? new Date(), "pp", {
                                            locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                                        })} now`,
                                    ],
                                    [
                                        "pt",
                                        `Bem-vindo, ${format(time ?? new Date(), "pp", {
                                            locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                                        })} agora`,
                                    ],
                                ])}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {!messagesLength
                                    ? writeLang([
                                          ["en", "You don't have any messages"],
                                          ["pt", "Você não tem nenhuma mensagem"],
                                      ])
                                    : writeLang([
                                          ["en", `You have ${messagesLength} messages`],
                                          [
                                              "pt",
                                              `Você tem ${messagesLength} ${
                                                  messagesLength === 1 ? "mensagem" : "mensagens"
                                              }`,
                                          ],
                                      ])}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="max-h-60 overflow-y-auto vertical-scrollbar">
                        {!messagesLength ? (
                            <p className="text-xs font-medium text-muted-foreground p-2 py-3">
                                {writeLang([
                                    ["en", "No messages yet"],
                                    ["pt", "Nenhuma mensagem ainda"],
                                ])}
                            </p>
                        ) : (
                            messages?.map((item: Message, i) => {
                                const child = (
                                    <div className="flex items-center space-x-2 group">
                                        <div
                                            className={cn(
                                                buttonVariants({ variant: "secondary" }),
                                                "p-0 aspect-square group-hover:bg-background",
                                            )}
                                        >
                                            <ChatBubbleIcon />
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-sm font-medium leading-none">
                                                {`${
                                                    writeLang([
                                                        ["en", "New message from"],
                                                        ["pt", "Nova mensagem de"],
                                                    ]) as string
                                                } ${item.user.name}`}
                                            </span>
                                            <p className="text-xs leading-none text-muted-foreground line-clamp-1">
                                                {item.text.substring(0, 100)}
                                            </p>
                                        </div>
                                    </div>
                                );

                                return (
                                    <DropdownMenuItem key={i} asChild>
                                        <Link to={`/chat`} className="cursor-pointer">
                                            {child}
                                        </Link>
                                    </DropdownMenuItem>
                                );
                            })
                        )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <TooltipContent sideOffset={14}>
                {writeLang([
                    ["en", "Messages"],
                    ["pt", "Mensagens"],
                ])}
            </TooltipContent>
        </Tooltip>
    );
}
