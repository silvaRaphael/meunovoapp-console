import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/section-header";
import { Separator } from "../../../components/ui/separator";
import { MemberForm } from "./form";
import { Button, buttonVariants } from "../../../components/ui/button";
import { Page } from "../../../components/page";
import { ConfirmationAlert } from "../../../components/confirmation-alert";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Member } from "../data/member";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { MemberTeams } from "./teams";
import { MemberProjects } from "./projects";
import { MemberTasks } from "./tasks";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/language-provider";

export function MemberDetails() {
    const { writeLang } = useLanguage();

    const { username } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState<Member>();

    function getMember(username?: string) {
        fetch("/api/members.json")
            .then((res) => res.json())
            .then((res) => {
                setMember(res.find((res: any) => res.username === username?.replace("@", "")) || null);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getMember(username);

        return () => {
            controller.abort();
        };
    }, [username]);

    if (!member) return <></>;

    return (
        <Page
            pathname="/members"
            header={
                <SectionHeader title="Members" pathname="/members" tree={!!member ? [{ label: `${member.name} ${member.lastName}` }] : []}>
                    <ConfirmationAlert
                        triggerButton={
                            <Button>
                                {writeLang([
                                    ["en", "Remove"],
                                    ["pt", "Remover"],
                                ])}
                            </Button>
                        }
                        title="Are you sure you want to delete this member?"
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
                                            title: "Member removed successfully!",
                                        });
                                        navigate("/members");
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
                <div>
                    <h3 className="text-lg font-medium">Edit Member</h3>
                    <p className="text-sm text-muted-foreground">Some of this informations are public for other users</p>
                </div>
                <Separator />
                <Tabs defaultValue="member">
                    <TabsList>
                        <TabsTrigger value="member">Member</TabsTrigger>
                        <TabsTrigger value="teams">Teams</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="member" className="pt-3">
                        <MemberForm member={member} />
                    </TabsContent>
                    <TabsContent value="teams" className="pt-3">
                        <MemberTeams member={member} />
                    </TabsContent>
                    <TabsContent value="projects" className="pt-3">
                        <MemberProjects member={member} />
                    </TabsContent>
                    <TabsContent value="tasks" className="pt-3">
                        <MemberTasks member={member} />
                    </TabsContent>
                </Tabs>
            </div>
        </Page>
    );
}
