import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { ProjectForm } from "./form";
import { Page } from "../../../components/shared/page";
import { Project } from "../data/project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/shared/language-provider";
import { useAuth } from "components/shared/auth-provider";
import { errorToast } from "components/shared/error-toast";
import { BASE_API } from "config/constants";
import { Button } from "components/ui/button";

export function ProjectDetails() {
    const { writeLang } = useLanguage();
    const { auth } = useAuth();
    const { id } = useParams();

    const [project, setProject] = useState<Project>();
    const [tab, setTab] = useState<string>();

    async function getProject(id?: string) {
        const request = await new HandleRequest().get(`${BASE_API}/projects/${id}`, {
            token: auth?.token,
        });

        request.onDone((response) => {
            setProject(response);
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getProject(id);

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!project) return <></>;

    return (
        <Page
            pathname={
                writeLang([
                    ["en", "/projects"],
                    ["pt", "/projetos"],
                ]) as string
            }
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", "Projects"],
                            ["pt", "Projetos"],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/projects"],
                            ["pt", "/projetos"],
                        ]) as string
                    }
                    tree={!!project ? [{ label: project.name }] : []}
                >
                    {tab === "tasks" && !["completed", "cancelled"].includes(project.status) && (
                        // <CreateProjectForm
                        //     label={
                        //         writeLang([
                        //             ["en", "Create project"],
                        //             ["pt", "Novo projeto"],
                        //         ]) as string
                        //     }
                        //     client_id={client.id}
                        //     onCreated={() => getClient(id)}
                        // />
                        <Button>
                            {
                                writeLang([
                                    ["en", "Create task"],
                                    ["pt", "Nova tarefa"],
                                ]) as string
                            }
                        </Button>
                    )}
                </SectionHeader>
            }
        >
            <div className="space-y-6 pb-40">
                <Tabs defaultValue="project" className="w-full" value={tab} onValueChange={setTab}>
                    <TabsList className="w-min flex mx-auto">
                        <TabsTrigger value="project" className="w-auto sm:w-36">
                            {writeLang([
                                ["en", "Project"],
                                ["pt", "Projeto"],
                            ])}
                        </TabsTrigger>
                        <TabsTrigger value="tasks" className="w-auto sm:w-36">
                            {writeLang([
                                ["en", "Tasks"],
                                ["pt", "Tarefas"],
                            ])}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="project" className="pt-3">
                        <ProjectForm project={project} />
                    </TabsContent>
                    <TabsContent value="tasks" className="pt-3">
                        {/* <ProjectTasks project={project} /> */}
                    </TabsContent>
                </Tabs>
            </div>
        </Page>
    );
}
