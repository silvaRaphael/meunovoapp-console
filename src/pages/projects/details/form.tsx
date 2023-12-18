import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Project } from "../data/project";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import format from "date-fns/format";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../../../components/ui/calendar";
import { SubmitButton } from "../../../components/shared/submit-button";
import { Separator } from "../../../components/ui/separator";
import { useLanguage } from "../../../components/shared/language-provider";
import { languages } from "../../../config/languages";
import { HandleRequest } from "lib/handle-request";
import { BASE_API } from "config/constants";
import { useAuth } from "components/shared/auth-provider";
import { errorToast } from "components/shared/error-toast";
import { CreateProjectSchema, createProjectSchema } from "adapters/project";
import { toast } from "components/ui/toast/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";
import { GetStatus, statuses, statusesColors, statusesIcons } from "../data/status";
import { HandlePermission, hasPermission } from "lib/handle-permission";

export function ProjectForm({ project }: { project: Project }) {
    const { language, writeLang } = useLanguage();
    const { auth } = useAuth();

    const locale = languages.find((item) => item.lang === language.lang)?.dateLocale;
    const isEditable = hasPermission(auth) && !["completed", "cancelled"].includes(project.status);

    const form = useForm<CreateProjectSchema>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: project.name,
            description: project.description ?? "",
            client_id: project.client.id,
            status: project.status,
            due: new Date(project.due),
        },
        mode: "onChange",
    });

    async function onSubmit(data: CreateProjectSchema) {
        const request = await new HandleRequest(data).put(`${BASE_API}/projects/${project.id}`, {
            token: auth?.token,
        });

        request.onDone(() => {
            toast({
                title: writeLang([
                    ["en", "Project has been updated successfully!"],
                    ["pt", "Projeto foi atualizado com sucesso!"],
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
                                ["en", "Project"],
                                ["pt", "Projeto"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change project info"],
                                ["pt", "Alterar informações do projeto"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Project title"],
                                            ["pt", "Título do projeto"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Project title"],
                                                    ["pt", "Título do projeto"],
                                                ]) as string
                                            }
                                            {...field}
                                            disabled={!isEditable}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="due"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Due date"],
                                            ["pt", "Prazo de entrega"],
                                        ])}
                                    </FormDescription>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn("pl-3 text-left font-normal bg-muted/50", !field.value && "text-muted-foreground")}
                                                    disabled={!isEditable}
                                                >
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
                                                mode="single"
                                                defaultMonth={new Date(field.value)}
                                                selected={new Date(field.value)}
                                                onSelect={field.onChange}
                                                initialFocus
                                                locale={locale}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>Status</FormDescription>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className={!field.value ? "text-muted-foreground" : ""} disabled={!isEditable}>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent side="top">
                                            {statuses.map((status, i) => (
                                                <SelectItem key={i} value={status}>
                                                    <div className={cn("flex items-center space-x-1", statusesColors[status])}>
                                                        {statusesIcons[status]}
                                                        <span className="whitespace-nowrap">
                                                            <GetStatus status={status} />
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Project description"],
                                            ["pt", "Descrição do projeto"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder={
                                                writeLang([
                                                    ["en", "Describe the project"],
                                                    ["pt", "Descreva o projeto"],
                                                ]) as string
                                            }
                                            className="resize-none"
                                            rows={5}
                                            {...field}
                                            disabled={!isEditable}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                {HandlePermission(
                    isEditable && (
                        <SubmitButton
                            label={
                                writeLang([
                                    ["en", "Update Project"],
                                    ["pt", "Atualizar Projeto"],
                                ]) as string
                            }
                            type="submit"
                            state={form.formState.isSubmitting ? "loading" : "initial"}
                        />
                    ),
                )}
            </form>
        </Form>
    );
}
