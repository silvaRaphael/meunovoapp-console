import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Separator } from "components/ui/separator";
import { EmailReply } from "./reply-form";
import { Email } from "../data/email";
import { useLanguage } from "components/shared/language-provider";
import { languages } from "config/languages";

export function EmailSearch({ email }: { email: Email }) {
    const { language, writeLang } = useLanguage();

    return (
        <div className="space-y-6">
            {email && (
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <EmailInfoItem
                            label={
                                writeLang([
                                    ["en", "SUBJECT"],
                                    ["pt", "ASSUNTO"],
                                ]) as string
                            }
                            value={email.subject}
                        />
                        <EmailInfoItem
                            label={
                                writeLang([
                                    ["en", "FROM"],
                                    ["pt", "DE"],
                                ]) as string
                            }
                            value={email.from}
                        />
                        <EmailInfoItem
                            label={
                                writeLang([
                                    ["en", "TO"],
                                    ["pt", "PARA"],
                                ]) as string
                            }
                            value={[email.to].flatMap((i) => i).join(",")}
                        />
                        <EmailInfoItem
                            label={
                                writeLang([
                                    ["en", "SENT"],
                                    ["pt", "ENVIADO"],
                                ]) as string
                            }
                            value={format(new Date(email.created_at), "PPP, pp", {
                                locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                            })}
                        />
                    </div>
                    <Separator />
                    <div className="flex">
                        <Tabs defaultValue="email" className="w-full">
                            <TabsList className="w-[400px] flex mx-auto">
                                <TabsTrigger value="email" className="w-full">
                                    {writeLang([
                                        ["en", "Email"],
                                        ["pt", "E-mail"],
                                    ])}
                                </TabsTrigger>
                                <TabsTrigger value="reply" className="w-full">
                                    {writeLang([
                                        ["en", "Reply"],
                                        ["pt", "Responder"],
                                    ])}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="email">
                                <div
                                    className="border p-4 mt-4 rounded-md"
                                    dangerouslySetInnerHTML={{
                                        __html: email.html.replace(/\n/g, "<br />"),
                                    }}
                                />
                            </TabsContent>
                            <TabsContent value="reply">
                                <EmailReply email={email} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            )}
        </div>
    );
}

const EmailInfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
    </div>
);
