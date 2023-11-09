import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/section-header";
import { Separator } from "../../../components/ui/separator";
import { TaskForm } from "./form";
import { Button, buttonVariants } from "../../../components/ui/button";
import { Page } from "../../../components/page";
import { ConfirmationAlert } from "../../../components/confirmation-alert";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Task } from "../data/task";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/language-provider";

export function TaskDetails() {
    const { writeLang } = useLanguage();

    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task>();

    function getTask(id?: string) {
        fetch("/api/tasks.json")
            .then((res) => res.json())
            .then((res) => {
                setTask(res.find((res: any) => res.id === id) || null);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getTask(id);

        return () => {
            controller.abort();
        };
    }, [id]);

    if (!task) return <></>;

    return (
        <Page
            pathname="/tasks"
            header={
                <SectionHeader title="Tasks" pathname="/tasks" tree={!!task ? [{ label: task.title }] : []}>
                    <ConfirmationAlert
                        triggerButton={
                            <Button>
                                {writeLang([
                                    ["en", "Remove"],
                                    ["pt", "Remover"],
                                ])}
                            </Button>
                        }
                        title="Are you sure you want to delete this task?"
                        description={
                            writeLang([
                                ["en", "This action cannot be undone. This will permanently delete this data."],
                                ["pt", "Esta ação não pode ser desfeita. Isto excluirá permanentemente estes dados."],
                            ]) as string
                        }
                        confirmButton={
                            <SubmitButton
                                label="Delete"
                                className={buttonVariants({ variant: "destructive" })}
                                onSubmit={async () => {
                                    const { onDone, onError } = await new HandleRequest().delete("https://jsonplaceholder.typicode.com/users");
                                    onDone(() => {
                                        toast({
                                            variant: "success",
                                            title: "Task removed successfully!",
                                        });
                                        navigate("/tasks");
                                    });
                                    onError(() =>
                                        toast({
                                            variant: "destructive",
                                            title: "An error occured!",
                                        }),
                                    );
                                }}
                            />
                        }
                    />
                </SectionHeader>
            }
        >
            <div className="space-y-6 pb-40">
                <div>
                    <h3 className="text-lg font-medium">Edit Task</h3>
                    <p className="text-sm text-muted-foreground">Some of this informations are public for other users</p>
                </div>
                <Separator />
                <TaskForm task={task} />
            </div>
        </Page>
    );
}
