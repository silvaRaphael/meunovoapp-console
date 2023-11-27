import { useEffect, useState } from "react";
import { DataTable } from "../../../components/ui/data-table/data-table";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../../components/shared/confirmation-alert";
import { ContentAlert } from "../../../components/shared/content-alert";
import { Actions } from "../../../components/shared/actions";
import { Task } from "../../tasks/data/task";
import { taskColumns } from "../../tasks/data/columns";
import { Client } from "../data/client";
import { useLanguage } from "../../../components/shared/language-provider";
import { buttonVariants } from "../../../components/ui/button";

export interface TaskRow extends Task {
    seeTeams?: (props: Task) => any;
}

export function ClientTasks({ client }: { client: Client }) {
    const { writeLang } = useLanguage();

    const [tasks, setTasks] = useState<TaskRow[]>([]);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [taskName, setTaskName] = useState<string>("");

    function getTasks(client: Client) {
        fetch("/api/tasks.json")
            .then((res) => res.json())
            .then((res) => {
                res = res.map((item: Task): TaskRow => {
                    return {
                        ...item,
                        seeTeams(item) {
                            setTaskName(item.title);
                        },
                    };
                });
                setTasks(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getTasks(client);

        return () => {
            controller.abort();
        };
    }, [client]);

    return (
        <>
            <DataTable columns={taskColumns.filter((item) => item.id !== "client")} data={tasks} />
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
                        label={
                            writeLang([
                                ["en", "Delete"],
                                ["pt", "Excluir"],
                            ]) as string
                        }
                        className={buttonVariants({ variant: "destructive" })}
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
