import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/section-header";
import { Separator } from "../../../components/ui/separator";
import { Button } from "../../../components/ui/button";
import { Page } from "../../../components/page";
import { ConfirmationAlert } from "../../../components/confirmation-alert";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Plan } from "../data/plan";
import { Mod } from "../../../mod/handle-request";

export function PlanDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState<Plan>();

    function getPlan(id?: string) {
        fetch("/api/plans.json")
            .then((res) => res.json())
            .then((res) => {
                setPlan(res.find((res: any) => res.id === id) || null);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getPlan(id);

        return () => {
            controller.abort();
        };
    }, [id]);

    if (!plan) return <></>;

    return (
        <Page
            pathname="/plans"
            header={
                <SectionHeader title="Plans" pathname="/plans" tree={!!plan ? [{ label: plan.title }] : []}>
                    <ConfirmationAlert
                        triggerButton={<Button>Remove</Button>}
                        title="Are you sure you want to delete this plan?"
                        description="This action cannot be undone. This will permanently delete this data."
                        confirmButton={
                            <SubmitButton
                                label="Delete"
                                onSubmit={async () => {
                                    const { onDone, onError } = await new Mod().delete("https://jsonplaceholder.typicode.com/users");
                                    onDone(() => {
                                        toast({
                                            variant: "success",
                                            title: "Plan removed successfully!",
                                        });
                                        navigate("/plans");
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
                    <h3 className="text-lg font-medium">Edit Plan</h3>
                    <p className="text-sm text-muted-foreground">Some of this informations are public for other users</p>
                </div>
                <Separator />
                {/* <PlanForm plan={plan} /> */}
            </div>
        </Page>
    );
}
