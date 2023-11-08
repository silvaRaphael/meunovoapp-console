import { useEffect, useState } from "react";
import { Team } from "../../teams/data/team";
import { Member } from "../data/member";
import { DataTable } from "../../../components/ui/data-table/data-table";
import { ConfirmationAlert } from "../../../components/confirmation-alert";
import { ContentAlert } from "../../../components/content-alert";
import { MemberInfo } from "../../../components/member-info";
import { Actions } from "../../../components/actions";
import { toast } from "../../../components/ui/toast/use-toast";
import { SubmitButton } from "../../../components/submit-button";
import { teamColumns } from "../../teams/data/columns";

interface TeamRow extends Team {
    seeMembers?: (props: Team) => any;
}

export function MemberTeams({ member }: { member: Member }) {
    const [teams, setTeams] = useState<TeamRow[]>([]);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [teamName, setTeamName] = useState<string>("");
    const [membersList, setMembersList] = useState<Member[] | null>(null);

    function getTeams(member: Member) {
        fetch("/api/teams.json")
            .then((res) => res.json())
            .then((res) => {
                res = res
                    .filter((item: Team) => item.manager.id === member.id || item.members.filter((item: Member) => item.id === member.id).length)
                    .map((item: Team): TeamRow => {
                        return {
                            ...item,
                            seeMembers(item) {
                                setMembersList(item.members);
                                setTeamName(item.name);
                            },
                        };
                    });
                setTeams(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getTeams(member);

        return () => {
            controller.abort();
        };
    }, [member]);

    return (
        <>
            <DataTable columns={teamColumns} data={teams} />
            <ConfirmationAlert
                open={openDelete}
                onOpenChange={setOpenDelete}
                title="Are you sure you want to delete this team?"
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
                                title: "Team removed successfully!",
                            });
                            setOpenDelete(false);
                        }}
                    />
                }
            />
            <ContentAlert open={!!membersList} onOpenChange={(open: boolean) => setMembersList(open ? membersList : null)} title={`Members of ${teamName}`}>
                <div className="max-h-[70vh] overflow-y-auto vertical-scrollbar space-y-2">
                    {!!membersList && (
                        <>
                            {membersList.map((member: Member, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <MemberInfo
                                        key={i}
                                        avatar={member?.avatar}
                                        username={member?.username}
                                        name={member?.name}
                                        lastName={member?.lastName}
                                        email={member?.email}
                                        jobTitle={member?.jobTitle.name}
                                        since={member?.since}
                                    />
                                    <Actions.Edit to={`/members/@${member.username}`} />
                                </div>
                            ))}
                            {!membersList.length && <p className="text-xs font-medium text-muted-foreground p-2 py-3">No members yet</p>}
                        </>
                    )}
                </div>
            </ContentAlert>
        </>
    );
}
