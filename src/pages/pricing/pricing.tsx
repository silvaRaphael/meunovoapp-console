import { SectionHeader } from "../../components/section-header";
import { Page } from "../../components/page";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { planIncludes, plans } from "./data/data";
import { Button } from "../../components/ui/button";
import { Slider } from "../../components/ui/slider";
import { activePlan } from "../../config/site";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { CheckCircle2, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export function Pricing() {
    return (
        <Page pathname="/pricing" header={<SectionHeader title="Pricing" pathname="/pricing"></SectionHeader>}>
            <div className="space-y-6 pb-40">
                <div className="grid grid-cols-3 gap-4">
                    {plans.map((item) => (
                        <Card className="flex flex-col justify-between">
                            <div>
                                <CardHeader>
                                    <CardTitle className="text-3xl flex justify-between items-center">
                                        {item.title}
                                        {activePlan.id === item.id && <Badge className="ms-2 h-min pointer-events-none">Current</Badge>}
                                    </CardTitle>
                                </CardHeader>
                                <Separator />
                                <CardContent className="mt-4 space-y-4 text-center">
                                    <h1 className="font-bold text-5xl flex justify-center">
                                        ${item.price}
                                        <span className="text-sm text-muted-foreground ms-1">/mo</span>
                                        {!!item.extras.length && <p className="flex items-center text-sm w-min text-left ms-2 border-l ps-2">+ extras</p>}
                                    </h1>
                                    <span className="inline-block text-md font-normal leading-5 text-muted-foreground">{item.description}</span>
                                    <Separator />
                                    {item.items.map((item) => (
                                        <div className="flex items-center">
                                            <CheckCircle2 size={16} className="me-2" />
                                            {item}
                                        </div>
                                    ))}
                                    {!!item.extras.length &&
                                        item.extras.map((extra) => (
                                            <div className="pt-4">
                                                <Slider min={0} max={100} step={extra.ammount} defaultValue={[extra.ammount]} />
                                                <p className="text-sm font-bold text-muted-foreground mt-2">
                                                    {extra.ammount} extra {extra.title}
                                                </p>
                                            </div>
                                        ))}
                                </CardContent>
                            </div>
                            <CardFooter>
                                <Button className="w-full" disabled={activePlan.id === item.id}>
                                    Upgrade
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="pt-8">
                    <h3 className="text-center text-3xl font-medium mb-6">Compare Plans & Features</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold text-text">Features</TableHead>
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
                                    {plans.map((plan, i) => (
                                        <TableCell key={i}>
                                            {plan.includes.find((planInclude) => planInclude.id === item.id) ? (
                                                <CheckCircle2 size={16} className="mx-auto" />
                                            ) : (
                                                <XCircle size={16} className="mx-auto text-muted" />
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Page>
    );
}
