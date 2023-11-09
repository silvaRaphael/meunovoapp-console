import { useEffect, useState } from "react";
import { DataTable } from "../../components/ui/data-table/data-table";
import { SectionHeader } from "../../components/section-header";
import { Search } from "../../components/search";
import { Page } from "../../components/page";
import { Button, buttonVariants } from "../../components/ui/button";
import { SubmitButton } from "../../components/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../components/confirmation-alert";
import { Member } from "../members/data/member";
import { ContentAlert } from "../../components/content-alert";
import { MemberInfo } from "../../components/member-info";
import { Actions } from "../../components/actions";
import { Team } from "./data/team";
import { teamColumns } from "./data/columns";
import { HandleRequest } from "../../lib/handle-request";
import { useLanguage } from "../../components/language-provider";

interface TeamRow extends Team {
    deleteAction?: (props: Team) => any;
    seeMembers?: (props: Team) => any;
}

export function Teams() {
    const { writeLang } = useLanguage();

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
                        deleteAction() {
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
                description={
                    writeLang([
                        ["en", "This action cannot be undone. This will permanently delete this data."],
                        ["pt", "Esta ação não pode ser desfeita. Isto excluirá permanentemente estes dados."],
                    ]) as string
                }
                confirmButton={
                    <SubmitButton
                        label="Delete"
                        className={buttonVariants({ variant: "destructive" })}
                        onSubmit={async () => {
                            const { onDone, onError } = await new HandleRequest().delete("https://jsonplaceholder.typicode.com/users");
                            onDone(() => {
                                toast({
                                    variant: "success",
                                    title: "Team removed successfully!",
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
        </Page>
    );
}
