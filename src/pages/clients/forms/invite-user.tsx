import React from "react";
import { InviteUserSchema, inviteUserSchema } from "adapters/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandleRequest } from "lib/handle-request";
import { BASE_API, SENDER_EMAIL } from "config/constants";
import { useAuth } from "components/shared/auth-provider";
import { useLanguage } from "components/shared/language-provider";
import { toast } from "components/ui/toast/use-toast";
import { errorToast } from "components/shared/error-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Input } from "components/ui/input";
import { SubmitButton } from "components/shared/submit-button";
import { ContentAlert } from "components/shared/content-alert";
import { Client } from "../data/client";
import { Button } from "components/ui/button";
import { User } from "config/user";

export function InviteUserForm({
    client,
    setClient,
    open,
    setOpen,
}: {
    client: Client;
    setClient: React.Dispatch<React.SetStateAction<Client | undefined>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { auth } = useAuth();
    const { writeLang } = useLanguage();

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
        }).post(`${BASE_API}/users`, {
            token: auth?.token,
        });

        request.onDone((response) => {
            toast({
                title: writeLang([
                    ["en", "User has been invited successfully!"],
                    ["pt", "Usuário foi convidado com sucesso!"],
                ]) as string,
            });

            form.reset({
                email: "",
            });

            setOpen(false);
            setClient({
                ...client,
                users: [
                    ...(client.users || []),
                    {
                        email: data.email,
                    } as User,
                ],
            });

            new HandleRequest({
                from: SENDER_EMAIL,
                to: [data.email],
                subject: `Você recebeu um convite para se juntar à MeuNovoApp`,
                userId: response.id,
            }).post(`${BASE_API}/emails/user-invite`, {
                token: auth?.token,
            });
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    return (
        <ContentAlert
            open={open}
            onOpenChange={setOpen}
            title={
                writeLang([
                    ["en", "Invite new user"],
                    ["pt", "Convidar novo usuário"],
                ]) as string
            }
            triggerButton={
                <Button>
                    {writeLang([
                        ["en", "Invite user"],
                        ["pt", "Convidar usuário"],
                    ])}
                </Button>
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
                                    ["en", "Invite User"],
                                    ["pt", "Convidar Usuário"],
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
