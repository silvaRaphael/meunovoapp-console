import { useEffect, useState } from "react";
import { DataTable } from "../../../components/ui/data-table/data-table";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../../components/confirmation-alert";
import { taskColumns } from "../../tasks/data/columns";
import { Task } from "../../tasks/data/task";
import { Project } from "../data/project";

export interface TaskRow extends Task {}

export function ProjectTasks({ project }: { project: Project }) {
    const [tasks, setTasks] = useState<TaskRow[]>([]);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    function getTasks(project: Project) {
        fetch("/api/tasks.json")
            .then((res) => res.json())
            .then((res) => {
                res = res
                    .filter((item: Task) => item.project.id === project.id)
                    .map((item: Task): TaskRow => {
                        return {
                            ...item,
                        };
                    });
                setTasks(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getTasks(project);

        return () => {
            controller.abort();
        };
    }, [project]);

    return (
        <>
            <DataTable columns={taskColumns.filter((item) => item.id !== "project")} data={tasks} />
            <ConfirmationAlert
                open={openDelete}
                onOpenChange={setOpenDelete}
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
                            toast({
                                title: "Task removed successfully!",
                            });
                            setOpenDelete(false);
                        }}
                    />
                }
            />
        </>
    );
}
