import { useEffect, useState } from "react";
import { Team, teamColumns } from "../../adapters/team";
import { DataTable } from "../../components/ui/data-table/data-table";
import { SectionHeader } from "../../components/section-header";
import { Search } from "../../components/search";
import { Page } from "../../components/page";
import { Button } from "../../components/ui/button";
import { SubmitButton } from "../../components/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../components/confirmation-alert";
import { Member } from "../../adapters/member";
import { ContentAlert } from "../../components/content-alert";
import { MemberInfo } from "../../components/member-info";
import { Actions } from "../../components/actions";

interface TeamRow extends Team {
    deleteAction?: (props: any) => any;
    seeMembers?: (props: any) => any;
}

export function Teams() {
    const [teams, setTeams] = useState<TeamRow[]>([]);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [teamName, setTeamName] = useState<string>("");
    const [membersList, setMembersList] = useState<Member[] | null>(null);

    function getTeams() {
        fetch("/api/teams.json")
            .then((res) => res.json())
            .then((res) => {
                res = res.map((item: Team): TeamRow => {
                    return {
                        ...item,
                        deleteAction(item) {
                            setOpenDelete(true);
                        },
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

        getTeams();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Page
            pathname="/teams"
            header={
                <SectionHeader title={`Teams (${teams.length})`} pathname="/teams">
                    <Search />
                    <Button>Create</Button>
                </SectionHeader>
            }
        >
            <DataTable columns={teamColumns} data={teams} />
            <ConfirmationAlert
                open={openDelete}
                onOpenChange={setOpenDelete}
                title="Are you sure you want to delete this team?"
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
                                <div className="flex justify-between items-center">
                                    <MemberInfo key={i} avatar={member?.avatar} username={member?.username} name={member?.name} lastName={member?.lastName} />
                                    <Actions.Edit to={`/members/@${member.username}`} />
                                </div>
                            ))}
                            {!membersList.length && <p className="text-xs font-medium text-muted-foreground p-2 py-3">No members yet</p>}
                        </>
                    )}
                </div>
            </ContentAlert>
        </Page>
    );
}
