import React from "react";
import { InviteUserSchema, inviteUserSchema } from "adapters/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandleRequest } from "lib/handle-request";
import { SENDER_EMAIL } from "config/constants";
import { useLanguage } from "components/shared/language-provider";
import { toast } from "components/ui/toast/use-toast";
import { errorToast } from "components/shared/error-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Input } from "components/ui/input";
import { SubmitButton } from "components/shared/submit-button";
import { ContentAlert } from "components/shared/content-alert";
import { Client } from "../data/client";
import { InviteUserEmail } from "components/shared/emails/invite-user-email";
import { render } from "@react-email/components";

export function InviteManagerForm({
    client,
    setClient,
}: {
    client: Client | null;
    setClient: React.Dispatch<React.SetStateAction<Client | null>>;
}) {
    const { language, writeLang } = useLanguage();

    const form = useForm<InviteUserSchema>({
        resolver: zodResolver(inviteUserSchema),
        defaultValues: {},
        mode: "onChange",
    });

    async function onSubmit(data: InviteUserSchema) {
        if (!client) return;

        const request = await new HandleRequest({
            email: data.email,
            client_id: client.id,
            is_manager: true,
        }).post(`/users`, { language });

        request.onDone((response) => {
            toast({
                title: writeLang([
                    ["en", "Manager has been invited successfully!"],
                    ["pt", "Responsável foi convidado com sucesso!"],
                ]) as string,
            });

            form.reset({
                email: "",
            });

            setClient(null);

            new HandleRequest({
                name: "",
                from: SENDER_EMAIL,
                to: [data.email],
                subject: `Você recebeu um convite para se juntar à MeuNovoApp`,
                html: render(<InviteUserEmail userId={response.id} />),
                no_save: true,
            }).post(`/emails`, { language });
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    return (
        <ContentAlert
            open={!!client?.id}
            onOpenChange={(open) => setClient(open ? client : null)}
            title={
                writeLang([
                    ["en", "Invite new manager"],
                    ["pt", "Convidar novo responsável"],
                ]) as string
            }
            hideCloseButton
        >
            <Form {...form}>
                <form className="grid" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Email"],
                                                    ["pt", "E-mail"],
                                                ]) as string
                                            }
                                            maxLength={50}
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SubmitButton
                            label={
                                writeLang([
                                    ["en", "Invite Manager"],
                                    ["pt", "Convidar Responsável"],
                                ]) as string
                            }
                            type="submit"
                            state={form.formState.isSubmitting ? "loading" : "initial"}
                            className="w-full"
                        />
                    </div>
                </form>
            </Form>
        </ContentAlert>
    );
}
