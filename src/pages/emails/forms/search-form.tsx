import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader } from "lucide-react";

import { Button } from "components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Input } from "components/ui/input";
import { toast } from "components/ui/toast/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Separator } from "components/ui/separator";
import { EmailReply } from "./reply-form";
import { Email } from "../data/email";

const FormSchema = z.object({
    emailID: z.string({ required_error: "Digite um ID." }).uuid({
        message: "Digite um ID válido.",
    }),
});

export type FormValues = z.infer<typeof FormSchema>;

export function EmailSearch() {
    const [email, setEmail] = useState<Email | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
    });

    async function onSubmit(data: FormValues) {
        try {
            const response = await fetch(`/api/emails/${data.emailID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error((await response.json()).error);
            }

            const { email } = await response.json();

            setEmail(email);
        } catch (error: any) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Ocorreu um erro!",
                description: error.message,
            });
        }
    }

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex space-x-4">
                        <FormField
                            control={form.control}
                            name="emailID"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormControl>
                                        <Input type="search" placeholder="ID do e-mail" className="bg-muted/50 border" onChange={field.onChange} value={field.value || ""} />
                                    </FormControl>
                                    <div className="flex">
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button className="gap-x-1" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <Loader size={14} className="animate-spin" />}
                            Buscar E-mail
                        </Button>
                    </div>
                </form>
            </Form>
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
