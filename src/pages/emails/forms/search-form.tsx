import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Separator } from "components/ui/separator";
import { EmailReply } from "./reply-form";
import { Email } from "../data/email";

export function EmailSearch({ email }: { email: Email }) {
    return (
        <div className="space-y-6">
            {email && (
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <EmailInfoItem label="ASSUNTO" value={email.subject} />
                        <EmailInfoItem label="DE" value={email.from} />
                        <EmailInfoItem label="PARA" value={[email.to].flatMap((i) => i).join(",")} />
                        <EmailInfoItem
                            label="ENVIO"
                            value={format(new Date(email.created_at), "PPP, pp", {
                                locale: ptBR,
                            })}
                        />
                    </div>
                    <Separator />
                    <div className="flex">
                        <Tabs defaultValue="email" className="w-full">
                            <TabsList className="w-[400px] flex mx-auto">
                                <TabsTrigger value="email" className="w-full">
                                    E-mail
                                </TabsTrigger>
                                <TabsTrigger value="reply" className="w-full">
                                    Responder
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="email">
                                <div
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
