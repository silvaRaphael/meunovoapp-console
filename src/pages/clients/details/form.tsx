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
import { BASE_API, BASE_FILES } from "config/constants";
import { useLanguage } from "components/shared/language-provider";
import { Separator } from "components/ui/separator";
import { useAuth } from "components/shared/auth-provider";
import { MaskedInput } from "components/shared/masked-input";
import { useState } from "react";
import { Button } from "components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { UploadCloudIcon } from "lucide-react";

export function ClientForm({ client }: { client: Client }) {
    const { writeLang } = useLanguage();
    const { auth } = useAuth();

    const [logotipo, setLogotipo] = useState<string | null>(client.logotipo ? `${BASE_FILES}/${client.logotipo}` : null);
    const [logotipoBase64, setLogotipoBase64] = useState<string | null>(null);

    const form = useForm<CreateClientSchema>({
        resolver: zodResolver(createClientSchema),
        defaultValues: {
            company: client.company,
            cpf: client.cpf || "",
            cnpj: client.cnpj || "",
        },
        mode: "onChange",
    });

    async function convertToBase64(file: File) {
        const reader = new FileReader();

        reader.onloadend = () => {
            setLogotipoBase64(reader.result?.toString() || null);
        };

        reader.readAsDataURL(file);
    }

    async function onSubmit(data: CreateClientSchema) {
        const request = await new HandleRequest({
            ...data,
            logotipoName: logotipo ? client.logotipo || "" : "",
            logotipo: logotipoBase64 || "",
        }).put(`${BASE_API}/clients/${client.id}`, {
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
                                ["en", "Change company data"],
                                ["pt", "Altere os dados da empresa"],
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
                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Enter company CPF"],
                                            ["pt", "Digite o CPF da empresa"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <MaskedInput
                                            mask="999.999.999-99"
                                            placeholder={
                                                writeLang([
                                                    ["en", "Company CPF"],
                                                    ["pt", "CPF da empresa"],
                                                ]) as string
                                            }
                                            inputMode="numeric"
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cnpj"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Enter company CNPJ"],
                                            ["pt", "Digite o CNPJ da empresa"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <MaskedInput
                                            mask="99.999.999/9999-99"
                                            placeholder={
                                                writeLang([
                                                    ["en", "Company CNPJ"],
                                                    ["pt", "CNPJ da empresa"],
                                                ]) as string
                                            }
                                            inputMode="numeric"
                                            onChange={field.onChange}
                                            value={field.value || ""}
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
                        <div className="flex flex-col items-center space-y-3">
                            <label htmlFor="logotipo-input">
                                <Avatar className="w-32 h-32 p-0 aspect-square border cursor-pointer">
                                    <AvatarImage src={logotipoBase64 ? logotipoBase64 : logotipo || undefined} />
                                    <AvatarFallback className="bg-muted/50 hover:bg-accent/60 group">
                                        <UploadCloudIcon className="text-muted-foreground/50 group-hover:text-primary/40" />
                                    </AvatarFallback>
                                </Avatar>
                            </label>
                            <FormDescription>
                                {writeLang([
                                    ["en", "Upload company logotipo"],
                                    ["pt", "Envie o logotipo da empresa"],
                                ])}
                            </FormDescription>
                            {(logotipo || logotipoBase64) && (
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        setLogotipo(null);
                                        setLogotipoBase64(null);
                                    }}
                                >
                                    {writeLang([
                                        ["en", "Remove Image"],
                                        ["pt", "Excluir Imagem"],
                                    ])}
                                </Button>
                            )}
                            <FormItem className="flex flex-col">
                                <FormControl>
                                    <Input
                                        id="logotipo-input"
                                        type="file"
                                        onChange={(event) => {
                                            if (event.target.files?.length) convertToBase64(event.target.files[0]);
                                        }}
                                        className="hidden"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </div>
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
