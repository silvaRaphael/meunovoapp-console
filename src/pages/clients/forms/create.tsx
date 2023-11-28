import { CreateClientSchema, createClientSchema } from "adapters/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandleRequest } from "lib/handle-request";
import { BASE_API } from "config/constants";
import { useAuth } from "components/shared/auth-provider";
import { useLanguage } from "components/shared/language-provider";
import { toast } from "components/ui/toast/use-toast";
import { errorToast } from "components/shared/error-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Input } from "components/ui/input";
import { SubmitButton } from "components/shared/submit-button";
import { ContentAlert } from "components/shared/content-alert";
import { Button } from "components/ui/button";
import { useState } from "react";

export function CreateClientForm({ onCreated }: { onCreated: Function }) {
    const { auth } = useAuth();
    const { writeLang } = useLanguage();

    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<CreateClientSchema>({
        resolver: zodResolver(createClientSchema),
        defaultValues: {},
        mode: "onChange",
    });

    async function onSubmit(data: CreateClientSchema) {
        const request = await new HandleRequest(data).post(`${BASE_API}/clients`, {
            token: auth?.token,
        });

        request.onDone(() => {
            toast({
                title: writeLang([
                    ["en", "Client has been created successfully!"],
                    ["pt", "Cliente foi criado com sucesso!"],
                ]) as string,
            });

            form.reset({
                company: "",
            });

            setOpen(false);
            onCreated();
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
                    ["en", "Add new client"],
                    ["pt", "Adicionar novo cliente"],
                ]) as string
            }
            triggerButton={
                <Button>
                    {writeLang([
                        ["en", "Create"],
                        ["pt", "Novo"],
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
                            name="company"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Company name"],
                                                    ["pt", "Nome da empresa"],
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
                                    ["en", "Add Client"],
                                    ["pt", "Adicionar Cliente"],
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
