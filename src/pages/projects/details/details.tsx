import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { ProjectForm } from "./form";
import { Button, buttonVariants } from "../../../components/ui/button";
import { Page } from "../../../components/shared/page";
import { ConfirmationAlert } from "../../../components/shared/confirmation-alert";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Project } from "../data/project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { ProjectTasks } from "./tasks";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/shared/language-provider";
import { SectionDetails } from "components/shared/section-details";

export function ProjectDetails() {
    const { writeLang } = useLanguage();

    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project>();

    function getProject(id?: string) {
        fetch("/api/projects.json")
            .then((res) => res.json())
            .then((res) => {
                setProject(res.find((res: any) => res.id === id) || null);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getProject(id);

        return () => {
            controller.abort();
        };
    }, [id]);

    if (!project) return <></>;

    return (
        <Page
            pathname="/projects"
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", "Projects"],
                            ["pt", "Projetos"],
                        ]) as string
                    }
                    pathname="/projects"
                    tree={!!project ? [{ label: project.title }] : []}
                >
                    <ConfirmationAlert
                        triggerButton={
                            <Button>
                                {writeLang([
                                    ["en", "Remove"],
                                    ["pt", "Remover"],
                                ])}
                            </Button>
                        }
                        title={
                            writeLang([
                                ["en", "Are you sure you want to delete this project?"],
                                ["pt", "Você tem certeza que deseja excluir este projeto?"],
                            ]) as string
                        }
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
                                            title: "Project removed successfully!",
                                        });
                                        navigate("/projects");
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
                <SectionDetails
                    title={writeLang([
                        ["en", "Edit Project"],
                        ["pt", "Editar Projeto"],
                    ])}
                    subtitle={writeLang([
                        ["en", "Some of this informations are public for other users"],
                        ["pt", "Algumas informações são públicas para outros usuários"],
                    ])}
                />
                <Tabs defaultValue="project">
                    <TabsList>
                        <TabsTrigger value="project">
                            {writeLang([
                                ["en", "Project"],
                                ["pt", "Projeto"],
                            ])}
                        </TabsTrigger>
                        <TabsTrigger value="tasks">
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
                        <ProjectTasks project={project} />
                    </TabsContent>
                </Tabs>
            </div>
        </Page>
    );
}
