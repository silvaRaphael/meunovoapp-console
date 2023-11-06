import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionHeader } from "../../../../components/section-header";
import { Separator } from "../../../../components/ui/separator";
import { Page } from "../../../../components/page";
import { Plan } from "../../data/plan";
import { plans } from "../../data/data";
import { PlanForm } from "./form";

export function PlanCustomize() {
    const { id } = useParams();
    const [plan, setPlan] = useState<Plan>();

    function getPlan(id?: string) {
        // fetch("/api/plans.json")
        //     .then((res) => res.json())
        //     .then((res) => {
        setPlan(plans.find((res: any) => res.id === id));
        // });
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
            pathname="/pricing"
            header={<SectionHeader title="Pricing" pathname="/pricing" tree={!!plan ? [{ label: "Customize Plan" }, { label: plan.title }] : []}></SectionHeader>}
        >
            <div className="space-y-6 pb-40">
                <div>
                    <h3 className="text-lg font-medium">Extras</h3>
                    <p className="text-sm text-muted-foreground">You can add extras to your plan</p>
                </div>
                <Separator />
                <PlanForm plan={plan} />
            </div>
        </Page>
    );
}
