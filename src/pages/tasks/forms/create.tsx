import { CreateTaskSchema, createTaskSchema } from "adapters/task";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";
import { Project } from "pages/projects/data/project";

export function CreateTaskForm({ label, project_id, projects, onCreated }: { label?: string; project_id?: string; projects?: Project[]; onCreated: Function }) {
    const { auth } = useAuth();
    const { writeLang } = useLanguage();

    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<CreateTaskSchema>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            project_id,
        },
        mode: "onChange",
    });

    async function onSubmit(data: CreateTaskSchema) {
        const request = await new HandleRequest(data).post(`${BASE_API}/tasks`, {
            token: auth?.token,
        });

        request.onDone(() => {
            toast({
                title: writeLang([
                    ["en", "Task has been created successfully!"],
                    ["pt", "Tarefa foi criada com sucesso!"],
                ]) as string,
            });

            form.reset({
                project_id: "",
                name: "",
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
                    ["en", "Add new task"],
                    ["pt", "Adicionar nova tarefa"],
                ]) as string
            }
            triggerButton={
                <Button>
                    {label ??
                        writeLang([
                            ["en", "Create"],
                            ["pt", "Nova"],
                        ])}
                </Button>
            }
            hideCloseButton
        >
            <Form {...form}>
                <form className="grid" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        {projects && (
                            <FormField
                                control={form.control}
                                name="project_id"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className={!field.value ? "text-muted-foreground" : ""}>
                                                <SelectValue
                                                    placeholder={
                                                        writeLang([
                                                            ["en", "Select a project"],
                                                            ["pt", "Selecione um projeto"],
                                                        ]) as string
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent side="top">
                                                {projects.map((project, i) => (
                                                    <SelectItem key={i} value={project.id}>
                                                        {project.name}
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
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Task name"],
                                                    ["pt", "Nome da tarefa"],
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
                                    ["en", "Add Task"],
                                    ["pt", "Adicionar Tarefa"],
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
