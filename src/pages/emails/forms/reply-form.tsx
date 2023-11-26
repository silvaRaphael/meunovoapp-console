import { Loader } from "lucide-react";

import { Button } from "components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Input } from "components/ui/input";
import { toast } from "components/ui/toast/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "components/ui/textarea";
import { Fragment, useState } from "react";
import { Email } from "../data/email";
import { BASE_API } from "config/constants";
import { useAuth } from "components/shared/auth-provider";
import { EmailSchema, emailSchema } from "adapters/email";

export function EmailReply({ email }: { email: Email }) {
    const { auth } = useAuth();

    const [replySent, setReplySent] = useState<boolean>(false);

    const form = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
        mode: "onChange",
        defaultValues: {
            subject: "Sua Mensagem foi Respondida - MeuNovoApp",
            name: "",
            projectDetails: "Nome do Projeto: [Nome do Projeto]\nDescrição: [Breve descrição do projeto e seus objetivos]",
            projectScope: [
                {
                    title: "Desenvolvimento de Aplicativo Móvel:",
                    value: "- Criação de um aplicativo personalizado para plataformas iOS e Android.\n- Interface de usuário intuitiva e experiência do usuário aprimorada.",
                },
                {
                    title: "Sistema Web Sob Medida:",
                    value: "- Desenvolvimento de um sistema web robusto e escalável.\n- Integração de funcionalidades específicas.",
                },
            ],
            projectDueDays: "60",
            projectPayment: "Nossa proposta inclui um investimento total de [Valor], dividido da seguinte forma:\n\n[Detalhes da Estrutura de Pagamento]",
            projectBenefits: "- Suporte contínuo pós-implantação.\n- Reuniões regulares de acompanhamento.\n- Garantia de qualidade e satisfação.\n",
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "projectScope",
        control: form.control,
    });

    async function onSubmit(data: EmailSchema) {
        try {
            const response = await fetch(`${BASE_API}/emails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.token}`,
                },
                body: JSON.stringify({
                    email: email.to,
                    title: "Resposta Contato - MeuNovoApp",
                    ...data,
                }),
            });

            if (!response.ok) {
                throw (await response.json()).error;
            }

            toast({
                title: "Sua proposta foi enviada!",
            });

            setReplySent(true);
        } catch (error: any) {
            toast({
                title: "Ocorreu algum erro!",
                description:
                    error.length &&
                    error.map(({ message }: any, i: number) => (
                        <Fragment key={i}>
                            {message}
                            <br />
                        </Fragment>
                    )),
                variant: "destructive",
            });
        }
    }

    if (replySent)
        return (
            <div className="w-full text-center py-10">
                <h4 className="text-2xl font-semibold text-center">Resposta enviada!</h4>
            </div>
        );

    return (
        <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormControl>
                                <Input
                                    placeholder="Assunto do e-mail"
                                    className="bg-muted/50 border"
                                    maxLength={65}
                                    onChange={field.onChange}
                                    value={field.value || ""}
                                    ref={field.ref}
                                    name={field.name}
                                />
                            </FormControl>
                            <div className="flex">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormControl>
                                <Input
                                    placeholder="Nome do contato"
                                    className="bg-muted/50 border"
                                    maxLength={50}
                                    onChange={field.onChange}
                                    value={field.value || ""}
                                    ref={field.ref}
                                    name={field.name}
                                />
                            </FormControl>
                            <div className="flex">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="projectDetails"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormControl>
                                <Textarea
                                    placeholder="Detalhes do projeto"
                                    className="bg-muted/50 border whitespace-pre-line"
                                    rows={5}
                                    onChange={field.onChange}
                                    value={field.value || ""}
                                    ref={field.ref}
                                    name={field.name}
                                />
                            </FormControl>
                            <div className="flex">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <div className="space-y-2">
                    {fields.map((field, i) => (
                        <div key={i} className="grid grid-cols-5 gap-4">
                            <div className="col-span-2 space-y-2">
                                <FormField
                                    control={form.control}
                                    key={field.id}
                                    name={`projectScope.${i}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Títudo do escopo"
                                                    className="bg-muted/50 border whitespace-pre-line"
                                                    onChange={field.onChange}
                                                    value={field.value || ""}
                                                    ref={field.ref}
                                                    name={field.name}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {i === fields.length - 1 && i !== 0 && (
                                    <Button variant="ghost" size="sm" className="text-muted-foreground w-full" onClick={() => remove(i)}>
                                        Remover
                                    </Button>
                                )}
                            </div>
                            <div className="col-span-3">
                                <FormField
                                    control={form.control}
                                    key={field.id}
                                    name={`projectScope.${i}.value`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Escopo do projeto"
                                                    className="bg-muted/50 border whitespace-pre-line"
                                                    rows={3}
                                                    onChange={field.onChange}
                                                    value={field.value || ""}
                                                    ref={field.ref}
                                                    name={field.name}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ title: "", value: "" })}>
                        Adicionar Escopo
                    </Button>
                </div>
                <FormField
                    control={form.control}
                    name="projectDueDays"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormControl>
                                <Input
                                    type="number"
                                    inputMode="numeric"
                                    placeholder="Prazo em dias"
                                    className="bg-muted/50 border"
                                    onChange={field.onChange}
                                    value={field.value || ""}
                                    ref={field.ref}
                                    name={field.name}
                                />
                            </FormControl>
                            <div className="flex">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="projectPayment"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormControl>
                                <Textarea
                                    placeholder="Estrutura de pagamento"
                                    className="bg-muted/50 border"
                                    onChange={field.onChange}
                                    value={field.value || ""}
                                    ref={field.ref}
                                    name={field.name}
                                />
                            </FormControl>
                            <div className="flex">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="projectBenefits"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormControl>
                                <Textarea
                                    placeholder="Benefícios adicionais"
                                    className="bg-muted/50 border"
                                    onChange={field.onChange}
                                    value={field.value || ""}
                                    ref={field.ref}
                                    name={field.name}
                                />
                            </FormControl>
                            <div className="flex">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button className="gap-x-1" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Loader size={14} className="animate-spin" />}
                        Enviar Resposta
                    </Button>
                </div>
            </form>
        </Form>
    );
}
