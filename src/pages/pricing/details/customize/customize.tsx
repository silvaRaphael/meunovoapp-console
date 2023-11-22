import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionHeader } from "../../../../components/shared/section-header";
import { Separator } from "../../../../components/ui/separator";
import { Page } from "../../../../components/shared/page";
import { Plan } from "../../data/plan";
import { plans } from "../../data/data";
import { PlanForm } from "./form";
import { useLanguage } from "../../../../components/shared/language-provider";

export function PlanCustomize() {
    const { writeLang } = useLanguage();
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
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", "Pricing"],
                            ["pt", "Plano"],
                        ]) as string
                    }
                    pathname="/pricing"
                    tree={
                        !!plan
                            ? [
                                  {
                                      label: writeLang([
                                          ["en", `Customize Plan - ${plan.title}`],
                                          ["pt", `Customizar Plano - ${plan.title}`],
                                      ]) as string,
                                  },
                              ]
                            : []
                    }
                ></SectionHeader>
            }
        >
            <div className="space-y-6 pb-40">
                <div>
                    <h3 className="text-lg font-medium">Extras</h3>
                    <p className="text-sm text-muted-foreground">
                        {writeLang([
                            ["en", "You can add extras to your plan"],
                            ["pt", "Você pode adicionar extras ao seu plano"],
                        ])}
                    </p>
                </div>
                <Separator />
                <PlanForm plan={plan} />
            </div>
        </Page>
    );
}
