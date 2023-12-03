import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "../../../lib/utils";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Task } from "../data/task";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { HandleRequest } from "../../../lib/handle-request";
import { CreateTaskSchema, createTaskSchema } from "adapters/task";
import { useAuth } from "components/shared/auth-provider";
import { useLanguage } from "components/shared/language-provider";
import { BASE_API } from "config/constants";
import { errorToast } from "components/shared/error-toast";
import { Separator } from "components/ui/separator";
import { statuses, statusesColors, statusesIcons } from "pages/projects/data/status";
import { HandlePermission, hasPermission } from "lib/handle-permission";

export function TaskForm({ task }: { task: Task }) {
    const { writeLang } = useLanguage();
    const { auth } = useAuth();

    const isEditable = hasPermission(auth) && !["completed", "cancelled"].includes(task.status);

    const form = useForm<CreateTaskSchema>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            name: task.name,
            description: task.description ?? "",
            project_id: task.project.id,
            status: task.status,
        },
        mode: "onChange",
    });

    async function onSubmit(data: CreateTaskSchema) {
        const request = await new HandleRequest(data).put(`${BASE_API}/tasks/${task.id}`, {
            token: auth?.token,
        });

        request.onDone(() => {
            toast({
                title: writeLang([
                    ["en", "Task has been updated successfully!"],
                    ["pt", "Tarefa foi atualizada com sucesso!"],
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
                                ["en", "Task"],
                                ["pt", "Tarefa"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change task info"],
                                ["pt", "Alterar informações da tarefa"],
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
                                            ["en", "Task title"],
                                            ["pt", "Título da tarefa"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Task title"],
                                                    ["pt", "Título da tarefa"],
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
                                                        <span className="whitespace-nowrap">{status}</span>
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
                                            ["en", "Task description"],
                                            ["pt", "Descrição da tarefa"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder={
                                                writeLang([
                                                    ["en", "Describe the task"],
                                                    ["pt", "Descreva a tarefa"],
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
                                    ["en", "Update Task"],
                                    ["pt", "Atualizar Tarefa"],
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
