import { Separator } from "../../../../components/ui/separator";
import { Page } from "../../../../components/page";
import { SectionHeader } from "../../../../components/section-header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { PlanExtra } from "../../data/plan";
import { CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "../../../../components/ui/table";
import { UpperFirst } from "../../../../lib/helper";
import { addMonths, format } from "date-fns";
import { CheckoutForm } from "./form";
import { useLanguage } from "../../../../components/language-provider";
import { languages } from "../../../../config/languages";

export function PlanCheckout() {
    const { language, writeLang } = useLanguage();
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

    console.log(plan);

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
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <CheckoutForm
                            plan={plan}
                            total={plan.data.extras.reduce((acc: any, crr: any) => ((crr.value[0] - crr.modulePrice) / crr.ammount) * crr.price + acc, 0) + plan.price}
                        />
                    </div>
                    <div className="">
                        <Card className="bg-accent">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    {writeLang([
                                        ["en", `Finish order - ${plan.title} plan`],
                                        ["pt", `Finalizar pedido - Plano ${plan.title}`],
                                    ])}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {plan.data.extras
                                        .filter((item: any) => item.value[0] - item.modulePrice !== 0)
                                        .map((item: PlanExtra & { modulePrice: number; value: number[] }, i: number) => (
                                            <div key={i} className="flex items-center">
                                                {item.value[0] - item.modulePrice && (
                                                    <>
                                                        <CheckCircle2 size={16} className="me-2" />
                                                        {writeLang([
                                                            ["en", `${item.value[0] - item.modulePrice} extra ${item.title} for `],
                                                            ["pt", `${item.value[0] - item.modulePrice} ${item.title} extra por `],
                                                        ])}
                                                        {(((item.value[0] - item.modulePrice) / item.ammount) * item.price).toLocaleString(language.locale, {
                                                            currency: language.currency,
                                                            style: "currency",
                                                        })}
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                </div>
                                <Table>
                                    <TableBody>
                                        {plan.data.extras.map((item: PlanExtra & { modulePrice: number; value: number[] }, i: number) => (
                                            <TableRow key={i} className="text-xs h-8 dark:border-b-neutral-900">
                                                <TableCell>{UpperFirst(item.title)}</TableCell>
                                                <TableCell className="text-end">{item.value[0]}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow className="text-sm font-medium h-12">
                                            <TableCell className="font-bold">Total</TableCell>
                                            <TableCell className="font-bold text-end">
                                                {(
                                                    plan.data.extras.reduce((acc: any, crr: any) => ((crr.value[0] - crr.modulePrice) / crr.ammount) * crr.price + acc, 0) +
                                                    plan.price
                                                ).toLocaleString(language.locale, {
                                                    currency: language.currency,
                                                    style: "currency",
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter>
                                <p className="text-sm">
                                    {writeLang([
                                        ["en", "Next invoice: "],
                                        ["pt", "Próxima cobrança: "],
                                    ])}
                                    {format(addMonths(new Date(), 1), "PPP", {
                                        locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                                    })}
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
