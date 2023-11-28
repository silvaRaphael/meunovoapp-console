import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Client } from "../data/client";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { HandleRequest } from "../../../lib/handle-request";
import { CreateClientSchema, createClientSchema } from "adapters/client";
import { errorToast } from "components/shared/error-toast";
import { BASE_API } from "config/constants";
import { useLanguage } from "components/shared/language-provider";
import { Separator } from "components/ui/separator";
import { useAuth } from "components/shared/auth-provider";

export function ClientForm({ client }: { client: Client }) {
    const { writeLang } = useLanguage();
    const { auth } = useAuth();

    const form = useForm<CreateClientSchema>({
        resolver: zodResolver(createClientSchema),
        defaultValues: {
            company: client.company,
            logotipo: client.logotipo || "",
        },
        mode: "onChange",
    });

    async function onSubmit(data: CreateClientSchema) {
        const request = await new HandleRequest(data).put(`${BASE_API}/clients/${client.id}`, {
            token: auth?.token,
        });

        request.onDone(() => {
            toast({
                title: writeLang([
                    ["en", "Client has been updated successfully!"],
                    ["pt", "Cliente foi atualizado com sucesso!"],
                ]) as string,
            });
        });

        request.onError((error) => errorToast(error));
    }

    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                ["en", "Company"],
                                ["pt", "Empresa"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change company name"],
                                ["pt", "Altere o nome da empresa"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Enter company name"],
                                            ["pt", "Digite o nome da empresa"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Company name"],
                                                    ["pt", "Nome da empresa"],
                                                ]) as string
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">Logotipo</h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change company logotipo"],
                                ["pt", "Altere o logotipo da empresa"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="logotipo"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Upload company logotipo"],
                                            ["pt", "Envie o logotipo da empresa"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            placeholder={
                                                writeLang([
                                                    ["en", "Company logotipo"],
                                                    ["pt", "Logotipo da empresa"],
                                                ]) as string
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <SubmitButton
                    label={
                        writeLang([
                            ["en", "Update Client"],
                            ["pt", "Atualizar Cliente"],
                        ]) as string
                    }
                    type="submit"
                    state={form.formState.isSubmitting ? "loading" : "initial"}
                />
            </form>
        </Form>
    );
}
