import { useEffect, useState } from "react";
import { DataTable } from "../../components/ui/data-table/data-table";
import { SectionHeader } from "../../components/section-header";
import { Search } from "../../components/search";
import { Page } from "../../components/page";
import { Button, buttonVariants } from "../../components/ui/button";
import { SubmitButton } from "../../components/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../components/confirmation-alert";
import { ContentAlert } from "../../components/content-alert";
import { Actions } from "../../components/actions";
import { Project } from "./data/project";
import { projectColumns } from "./data/columns";
import { Team } from "../teams/data/team";
import { HandleRequest } from "../../lib/handle-request";
import { useLanguage } from "../../components/language-provider";

export interface ProjectRow extends Project {
    deleteAction?: (props: Project) => any;
    seeTeams?: (props: Project) => any;
}

export function Projects() {
    const { writeLang } = useLanguage();

    const [projects, setProjects] = useState<ProjectRow[]>([]);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [projectName, setProjectName] = useState<string>("");
    const [teamsList, setTeamsList] = useState<Team[] | null>(null);

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
                            setTeamsList(item.teams);
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
            pathname="/projects"
            header={
                <SectionHeader title={`Projects (${projects.length})`} pathname="/projects">
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
            <ContentAlert open={!!teamsList} onOpenChange={(open: boolean) => setTeamsList(open ? teamsList : null)} title={`Teams of ${projectName}`}>
                <div className="max-h-[70vh] overflow-y-auto vertical-scrollbar space-y-2">
                    {!!teamsList && (
                        <>
                            {teamsList.map((team: Team, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    {team.name}
                                    <Actions.Edit to={`/teams/${team.slug}`} />
                                </div>
                            ))}
                            {!teamsList.length && <p className="text-xs font-medium text-muted-foreground p-2 py-3">No teams yet</p>}
                        </>
                    )}
                </div>
            </ContentAlert>
        </Page>
    );
}
