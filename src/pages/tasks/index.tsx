import { useEffect, useState } from "react";
import { DataTable } from "components/ui/data-table/data-table";
import { SectionHeader } from "components/shared/section-header";
import { Page } from "components/shared/page";
import { useLanguage } from "components/shared/language-provider";
import { HandleRequest } from "lib/handle-request";
import { Task } from "./data/task";
import { taskColumns } from "./data/columns";
import { errorToast } from "components/shared/error-toast";
import { CreateTaskForm } from "./forms/create";
import { Project } from "pages/projects/data/project";
import { HandlePermission } from "lib/handle-permission";

export function Tasks() {
    const { language, writeLang } = useLanguage();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    async function getTasks() {
        const request = await new HandleRequest().get(`/tasks`, { language });

        request.onDone((response) => {
            setTasks(response);
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    async function getProjects() {
        const request = await new HandleRequest().get(`/projects`, { language });

        request.onDone((response) => {
            setProjects(response.filter((item: Project) => !["completed", "cancelled"].includes(item.status)));
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getTasks();
        getProjects();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    {HandlePermission(<CreateTaskForm projects={projects} onCreated={getTasks} />)}
                </SectionHeader>
            }
        >
            <DataTable columns={taskColumns(language, writeLang)} data={tasks} />
        </Page>
    );
}
