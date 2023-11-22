import { Separator } from "../../../../components/ui/separator";
import { Page } from "../../../../components/shared/page";
import { SectionHeader } from "../../../../components/shared/section-header";
import { CheckoutForm } from "./form";
import { useLanguage } from "../../../../components/shared/language-provider";

export function PlanCheckout() {
    const { writeLang } = useLanguage();

    const plan = JSON.parse(sessionStorage.getItem("planCheckout") ?? "");
    const tree: {
        label: string;
        pathname?: string | undefined;
    }[] = !!plan
        ? [
              {
                  label: writeLang([
                      ["en", "Checkout"],
                      ["pt", "Finalizar"],
                  ]) as string,
              },
          ]
        : [];
    if (plan?.extras.length)
        tree.unshift({
            label: writeLang([
                ["en", `Customize Plan - ${plan.title}`],
                ["pt", `Customizar Plano - ${plan.title}`],
            ]) as string,
            pathname: `/pricing/customize/${plan.id}`,
        });

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
                    tree={tree}
                ></SectionHeader>
            }
        >
            <div className="space-y-6 pb-40">
                <div>
                    <h3 className="text-lg font-medium">
                        {writeLang([
                            ["en", "Checkout"],
                            ["pt", "Finalizar"],
                        ])}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {writeLang([
                            ["en", "Finishing your checkout"],
                            ["pt", "Finalizando seu pedido"],
                        ])}
                    </p>
                </div>
                <Separator />
                <CheckoutForm
                    plan={plan}
                    total={
                        !plan.data?.extras
                            ? plan.price
                            : plan.data?.extras.reduce((acc: any, crr: any) => ((crr.value[0] - crr.modulePrice) / crr.ammount) * crr.price + acc, 0) + plan.price
                    }
                />
            </div>
        </Page>
    );
}
