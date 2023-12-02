import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { Separator } from "../../../components/ui/separator";
import { TaskForm } from "./form";
import { Button, buttonVariants } from "../../../components/ui/button";
import { Page } from "../../../components/shared/page";
import { ConfirmationAlert } from "../../../components/shared/confirmation-alert";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Task } from "../data/task";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/shared/language-provider";
import { errorToast } from "components/shared/error-toast";
import { BASE_API } from "config/constants";
import { useAuth } from "components/shared/auth-provider";

export function TaskDetails() {
    const { writeLang } = useLanguage();
    const { auth } = useAuth();
    const { id } = useParams();

    const [task, setTask] = useState<Task>();

    async function getTask(id?: string) {
        const request = await new HandleRequest().get(`${BASE_API}/tasks/${id}`, {
            token: auth?.token,
        });

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
