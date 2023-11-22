import { SectionHeader } from "../../components/shared/section-header";
import { Page } from "../../components/shared/page";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { planIncludes, plans } from "./data/data";
import { Button } from "../../components/ui/button";
import { activePlan } from "../../config/site";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { CheckCircle2, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../components/shared/language-provider";

export function Pricing() {
    const { language, writeLang } = useLanguage();
    const navigate = useNavigate();

    return (
        <Page
            pathname="/pricing"
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", "Pricing"],
                            ["pt", "Planos"],
                        ]) as string
                    }
                    pathname="/pricing"
                />
            }
        >
            <div className="space-y-6 pb-40">
                <div className="grid grid-cols-3 gap-4">
                    {plans.map((item, i) => (
                        <Card key={i} className="flex flex-col justify-between">
                            <div>
                                <CardHeader>
                                    <CardTitle className="text-3xl flex justify-between items-center">
                                        {item.title}
                                        <div className="flex space-x-2 ms-2">
                                            {item.recommended && (
                                                <Badge variant="outline" className="h-min pointer-events-none">
                                                    {writeLang([
                                                        ["en", "Recommended"],
                                                        ["pt", "Recomendado"],
                                                    ])}
                                                </Badge>
                                            )}
                                            {activePlan.id === item.id && (
                                                <Badge className="h-min pointer-events-none">
                                                    {writeLang([
                                                        ["en", "Current"],
                                                        ["pt", "Atual"],
                                                    ])}
                                                </Badge>
                                            )}
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <Separator />
                                <CardContent className="mt-4 space-y-4 text-center">
                                    <h1 className="font-bold text-5xl flex justify-center">
                                        {item.price.toLocaleString(language.locale, {
                                            currency: language.currency,
                                            style: "currency",
                                            maximumFractionDigits: 0,
                                        })}
                                        <span className="text-sm text-muted-foreground ms-1">
                                            /
                                            {writeLang([
                                                ["en", "mo"],
                                                ["pt", "mês"],
                                            ])}
                                        </span>
                                        {!!item.extras.length && <p className="flex items-center text-sm w-min text-left ms-2 border-l ps-2">+ extras</p>}
                                    </h1>
                                    <span className="inline-block text-md font-normal leading-5 text-muted-foreground">{item.description}</span>
                                    <Separator />
                                    {item.items.map((item, i) => (
                                        <div key={i} className="flex items-center">
                                            <CheckCircle2 size={16} className="me-2" />
                                            {item}
                                        </div>
                                    ))}
                                </CardContent>
                            </div>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    disabled={activePlan.id === item.id}
                                    onClick={() => {
                                        if (!item.extras.length) sessionStorage.setItem("planCheckout", JSON.stringify(item));
                                        navigate(!!item.extras.length ? `/pricing/customize/${item.id}` : "/pricing/checkout");
                                    }}
                                >
                                    {!!item.extras.length
                                        ? writeLang([
                                              ["en", "Customize"],
                                              ["pt", "Customizar"],
                                          ])
                                        : writeLang([
                                              ["en", "Upgrade"],
                                              ["pt", "Escolher"],
                                          ])}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="pt-8">
                    <h3 className="text-center text-3xl font-medium mb-6">
                        {writeLang([
                            ["en", "Compare Plans & Features"],
                            ["pt", "Comparar Planos e Funcionalidades"],
                        ])}
                    </h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold text-text">
                                    {writeLang([
                                        ["en", "Features"],
                                        ["pt", "Funcionalidades"],
                                    ])}
                                </TableHead>
                                {plans.map((item, i) => (
                                    <TableHead key={i} className="font-bold text-text text-center">
                                        {item.title}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {planIncludes.map((item, i) => (
                                <TableRow key={i} className="text-sm font-medium h-12">
                                    <TableCell>{item.title}</TableCell>
                                    {plans.map((plan, i) => {
                                        const includesPlan = plan.includes.find((planInclude) => planInclude.id === item.id);
                                        return (
                                            <TableCell key={i} className="text-center">
                                                {includesPlan ? (
                                                    typeof includesPlan.value === "boolean" ? (
                                                        includesPlan.value ? (
                                                            <CheckCircle2 size={16} className="mx-auto" />
                                                        ) : (
                                                            <X size={16} className="mx-auto" />
                                                        )
                                                    ) : (
                                                        <p>{includesPlan.value}</p>
                                                    )
                                                ) : (
                                                    <X size={16} className="mx-auto" />
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Page>
    );
}
