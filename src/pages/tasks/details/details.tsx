import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/section-header";
import { Separator } from "../../../components/ui/separator";
import { TaskForm } from "./form";
import { Button } from "../../../components/ui/button";
import { Page } from "../../../components/page";
import { ConfirmationAlert } from "../../../components/confirmation-alert";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Task } from "../data/task";

export function TaskDetails() {
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
                        triggerButton={<Button>Remove</Button>}
                        title="Are you sure you want to delete this task?"
                        description="This action cannot be undone. This will permanently delete this data."
                        confirmButton={
                            <SubmitButton
                                label="Delete"
                                onSubmit={async () => {
                                    await new Promise((resolve, rejects) => {
                                        setTimeout(() => {
                                            resolve(1);
                                            // rejects("An error occured!");
                                        }, 1000);
                                    });
                                }}
                                onError={(error: any) => {
                                    toast({
                                        variant: "destructive",
                                        title: error || "An error occured!",
                                    });
                                }}
                                onSuccess={() => {
                                    navigate("/tasks", {
                                        state: {
                                            toast: {
                                                title: "Task removed successfully!",
                                            },
                                        },
                                    });
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
