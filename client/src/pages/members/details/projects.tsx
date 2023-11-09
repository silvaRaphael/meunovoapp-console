import { useEffect, useState } from "react";
import { DataTable } from "../../../components/ui/data-table/data-table";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../../components/confirmation-alert";
import { ContentAlert } from "../../../components/content-alert";
import { Actions } from "../../../components/actions";
import { Project } from "../../projects/data/project";
import { Team } from "../../teams/data/team";
import { projectColumns } from "../../projects/data/columns";
import { Member } from "../data/member";
import { useLanguage } from "../../../components/language-provider";

export interface ProjectRow extends Project {
    seeTeams?: (props: Project) => any;
}

export function MemberProjects({ member }: { member: Member }) {
    const { writeLang } = useLanguage();

    const [projects, setProjects] = useState<ProjectRow[]>([]);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [projectName, setProjectName] = useState<string>("");
    const [teamsList, setTeamsList] = useState<Team[] | null>(null);

    function getProjects(member: Member) {
        fetch("/api/projects.json")
            .then((res) => res.json())
            .then((res) => {
                res = res
                    .filter(
                        (item: Project) =>
                            item.manager.id === member.id || item.teams.filter((item: Team) => item.members.filter((item: Member) => item.id === member.id).length).length,
                    )
                    .map((item: Project): ProjectRow => {
                        return {
                            ...item,
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

        getProjects(member);

        return () => {
            controller.abort();
        };
    }, [member]);

    return (
        <>
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
                                title: "Project removed successfully!",
                            });
                            setOpenDelete(false);
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
        </>
    );
}
