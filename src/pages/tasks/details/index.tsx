import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { TaskForm } from "./form";
import { Page } from "../../../components/shared/page";
import { Task } from "../data/task";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/shared/language-provider";
import { errorToast } from "components/shared/error-toast";

export function TaskDetails() {
    const { language, writeLang } = useLanguage();
    const { id } = useParams();

    const [task, setTask] = useState<Task>();

    async function getTask(id?: string) {
        const request = await new HandleRequest().get(`/tasks/${id}`, { language });

        request.onDone((response) => {
            setTask(response);
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getTask(id);

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!task) return <></>;

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
                            ["en", "Tasks"],
                            ["pt", "Tarefas"],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/tasks"],
                            ["pt", "/tarefas"],
                        ]) as string
                    }
                    tree={!!task ? [{ label: task.name }] : []}
                ></SectionHeader>
            }
        >
            <div className="space-y-6 pb-40">
                <TaskForm task={task} />
            </div>
        </Page>
    );
}
