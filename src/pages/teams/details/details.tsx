import { useEffect, useState } from "react";
import { Team } from "../../../adapters/team";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/section-header";
import { Separator } from "../../../components/ui/separator";
import { TeamForm } from "./form";
import { Button } from "../../../components/ui/button";
import { Page } from "../../../components/page";
import { ConfirmationAlert } from "../../../components/confirmation-alert";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";

export function TeamDetails() {
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
                        triggerButton={<Button>Remove</Button>}
                        title="Are you sure you want to delete this team?"
                        description="This action cannot be undone. This will permanently delete this data."
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
                                    navigate("/teams", {
                                        state: {
                                            toast: {
                                                title: "Team removed successfully!",
                                            },
                                        },
                                    });
                                }}
                            />
                        }
                    />
                </SectionHeader>
            }
        >
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Edit Team</h3>
                    <p className="text-sm text-muted-foreground">Some of this informations are public for other users</p>
                </div>
                <Separator />
                <TeamForm team={team} />
            </div>
        </Page>
    );
}
