import { useEffect, useState } from "react";
import { DataTable } from "components/ui/data-table/data-table";
import { SectionHeader } from "components/shared/section-header";
import { Search } from "components/shared/search";
import { Page } from "components/shared/page";
import { Button, buttonVariants } from "components/ui/button";
import { SubmitButton } from "components/shared/submit-button";
import { toast } from "components/ui/toast/use-toast";
import { ConfirmationAlert } from "components/shared/confirmation-alert";
import { ContentAlert } from "components/shared/content-alert";
import { Actions } from "components/shared/actions";
import { useLanguage } from "components/shared/language-provider";
import { HandleRequest } from "lib/handle-request";
import { Project } from "./data/project";
import { projectColumns } from "./data/columns";

export interface ProjectRow extends Project {
    deleteAction?: (props: Project) => any;
    seeTeams?: (props: Project) => any;
}

export function Projects() {
    const { writeLang } = useLanguage();

    const [projects, setProjects] = useState<ProjectRow[]>([]);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [projectName, setProjectName] = useState<string>("");

    function getProjects() {
        fetch("/api/projects.json")
            .then((res) => res.json())
            .then((res) => {
                res = res.map((item: Project): ProjectRow => {
                    return {
                        ...item,
                        deleteAction() {
                            setOpenDelete(true);
                        },
                        seeTeams(item) {
                            setProjectName(item.title);
                        },
                    };
                });
                setProjects(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getProjects();

        return () => {
            controller.abort();
        };
    }, []);

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
                            ["en", `Projects (${projects.length})`],
                            ["pt", `Projetos (${projects.length})`],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/projects"],
                            ["pt", "/projetos"],
                        ]) as string
                    }
                >
                    <Search />
                    <Button>Create</Button>
                </SectionHeader>
            }
        >
            <DataTable columns={projectColumns} data={projects} />
            <ConfirmationAlert
                open={openDelete}
                onOpenChange={setOpenDelete}
                title="Are you sure you want to delete this project?"
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
