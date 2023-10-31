import { SectionHeader } from "../../components/section-header";
import { Page } from "../../components/page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { plans } from "./data/data";
import { Button } from "../../components/ui/button";
import { Slider } from "../../components/ui/slider";

export function Pricing() {
    return (
        <Page pathname="/pricing" header={<SectionHeader title="Pricing" pathname="/pricing"></SectionHeader>}>
            <div className="space-y-6 pb-40">
                {/* <div>
                    <h3 className="text-lg font-medium">Edit your Preferences</h3>
                    <p className="text-sm text-muted-foreground">This is your preferences for the app</p>
                </div>
                <Separator /> */}
                <div className="grid grid-cols-3 gap-4">
                    {plans.map((item) => (
                        <Card className="flex flex-col justify-between">
                            <div>
                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        {item.description}
                                        <div className="mt-4">
                                            <p>Members: {item.minMembers}</p>
                                            <p>
                                                Price:{" "}
                                                {Intl.NumberFormat(undefined, {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format(item.minPrice)}
                                            </p>
                                        </div>
                                    </CardDescription>
                                    {!!item.groupMembers && (
                                        <div className="mt-4">
                                            <Slider min={0} max={100} step={item.groupMembers} defaultValue={[15]} />
                                            <p className="text-sm font-bold text-muted-foreground mt-2">15 extra members</p>
                                        </div>
                                    )}
                                </CardContent>
                            </div>
                            <CardFooter>
                                <Button className="w-full">Upgrade</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </Page>
    );
}
