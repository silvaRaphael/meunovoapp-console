import { CreateProjectSchema, createProjectSchema } from "adapters/project";
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
import { Client } from "pages/clients/data/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Calendar } from "components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "lib/utils";
import { languages } from "config/languages";

export function CreateProjectForm({ label, client_id, clients, onCreated }: { label?: string; client_id?: string; clients?: Client[]; onCreated: Function }) {
    const { auth } = useAuth();
    const { language, writeLang } = useLanguage();

    const [open, setOpen] = useState<boolean>(false);

    const locale = languages.find((item) => item.lang === language.lang)?.dateLocale;

    const form = useForm<CreateProjectSchema>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            client_id,
        },
        mode: "onChange",
    });

    async function onSubmit(data: CreateProjectSchema) {
        const request = await new HandleRequest(data).post(`${BASE_API}/projects`, {
            token: auth?.token,
        });

        request.onDone(() => {
            toast({
                title: writeLang([
                    ["en", "Project has been created successfully!"],
                    ["pt", "Projeto foi criado com sucesso!"],
                ]) as string,
            });

            form.reset({
                client_id: "",
                name: "",
                due: undefined,
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
                    ["en", "Add new project"],
                    ["pt", "Adicionar novo projeto"],
                ]) as string
            }
            triggerButton={
                <Button>
                    {label ??
                        writeLang([
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
                        {clients && (
                            <FormField
                                control={form.control}
                                name="client_id"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className={!field.value ? "text-muted-foreground" : ""}>
                                                <SelectValue
                                                    placeholder={
                                                        writeLang([
                                                            ["en", "Select a client"],
                                                            ["pt", "Selecione um cliente"],
                                                        ]) as string
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent side="top">
                                                {clients.map((client, i) => (
                                                    <SelectItem key={i} value={client.id}>
                                                        {client.company}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="due"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" className={cn("pl-3 text-left font-normal bg-muted/50", !field.value && "text-muted-foreground")}>
                                                    {field.value ? (
                                                        format(new Date(field.value), "PPP", {
                                                            locale,
                                                        })
                                                    ) : (
                                                        <span>
                                                            {writeLang([
                                                                ["en", "Pick a due date"],
                                                                ["pt", "Selecione um prazo"],
                                                            ])}
                                                        </span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                locale={locale}
                                                mode="single"
                                                defaultMonth={field.value ? new Date(field.value) : new Date()}
                                                selected={field.value ? new Date(field.value) : new Date()}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Project name"],
                                                    ["pt", "Nome do projeto"],
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
                                    ["en", "Add Project"],
                                    ["pt", "Adicionar Projeto"],
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
