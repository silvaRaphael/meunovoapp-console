import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { Separator } from "../../../components/ui/separator";
import { TeamForm } from "./form";
import { Button, buttonVariants } from "../../../components/ui/button";
import { Page } from "../../../components/shared/page";
import { ConfirmationAlert } from "../../../components/shared/confirmation-alert";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Team } from "../data/team";
import { TeamProjects } from "./projects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/shared/language-provider";

export function TeamDetails() {
    const { writeLang } = useLanguage();

    const { slug } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState<Team>();

    function getTeam(slug?: string) {
        fetch("/api/teams.json")
            .then((res) => res.json())
            .then((res) => {
                setTeam(res.find((res: any) => res.slug === slug) || null);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getTeam(slug);

        return () => {
            controller.abort();
        };
    }, [slug]);

    if (!team) return <></>;

    return (
        <Page
            pathname="/teams"
            header={
                <SectionHeader title="Teams" pathname="/teams" tree={!!team ? [{ label: team.name }] : []}>
                    <ConfirmationAlert
                        triggerButton={
                            <Button>
                                {writeLang([
                                    ["en", "Remove"],
                                    ["pt", "Remover"],
                                ])}
                            </Button>
                        }
                        title="Are you sure you want to delete this team?"
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
                                            title: "Team removed successfully!",
                                        });
                                        navigate("/teams");
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
                    <h3 className="text-lg font-medium">Edit Team</h3>
                    <p className="text-sm text-muted-foreground">Some of this informations are public for other users</p>
                </div>
                <Separator />
                <Tabs defaultValue="team">
                    <TabsList>
                        <TabsTrigger value="team">Team</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                    </TabsList>
                    <TabsContent value="team" className="pt-3">
                        <TeamForm team={team} />
                    </TabsContent>
                    <TabsContent value="projects" className="pt-3">
                        <TeamProjects team={team} />
                    </TabsContent>
                </Tabs>
            </div>
        </Page>
    );
}
