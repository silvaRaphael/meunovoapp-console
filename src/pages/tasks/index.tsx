import { useEffect, useState } from "react";
import { DataTable } from "../../components/ui/data-table/data-table";
import { SectionHeader } from "../../components/shared/section-header";
import { Search } from "../../components/shared/search";
import { Page } from "../../components/shared/page";
import { Button, buttonVariants } from "../../components/ui/button";
import { SubmitButton } from "../../components/shared/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../components/shared/confirmation-alert";
import { Task } from "./data/task";
import { taskColumns } from "./data/columns";
import { HandleRequest } from "../../lib/handle-request";
import { useLanguage } from "../../components/shared/language-provider";

export interface TaskRow extends Task {
    deleteAction?: (props: Task) => any;
}

export function Tasks() {
    const { writeLang } = useLanguage();

    const [tasks, setTasks] = useState<TaskRow[]>([]);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    function getTasks() {
        fetch("/api/tasks.json")
            .then((res) => res.json())
            .then((res) => {
                res = res.map((item: Task): TaskRow => {
                    return {
                        ...item,
                        deleteAction() {
                            setOpenDelete(true);
                        },
                    };
                });
                setTasks(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getTasks();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Page
            pathname={
                writeLang([
                    ["en", "/tasks"],
                    ["pt", "/tarefas"],
                ]) as string
            }
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", `Tasks (${tasks.length})`],
                            ["pt", `Tarefas (${tasks.length})`],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/tasks"],
                            ["pt", "/tarefas"],
                        ]) as string
                    }
                >
                    <Search />
                    <Button>Create</Button>
                </SectionHeader>
            }
        >
            <DataTable columns={taskColumns} data={tasks} />
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
                            const { onDone, onError } = await new HandleRequest().delete("https://jsonplaceholder.typicode.com/users");
                            onDone(() => {
                                toast({
                                    variant: "success",
                                    title: "Task removed successfully!",
                                });
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
        </Page>
    );
}
