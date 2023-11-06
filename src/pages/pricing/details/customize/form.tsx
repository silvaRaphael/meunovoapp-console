import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../../../components/ui/form";
import { SubmitButton } from "../../../../components/submit-button";
import { Separator } from "../../../../components/ui/separator";
import { Plan } from "../../data/plan";
import { UpperFirst } from "../../../../lib/helper";
import { Slider } from "../../../../components/ui/slider";
import { HandleRequest } from "../../../../lib/handle-request";
import { toast } from "../../../../components/ui/toast/use-toast";
import { useNavigate } from "react-router-dom";

const planFormSchema = z.object({
    extras: z.array(
        z.object({
            title: z.string(),
            ammount: z.number().int(),
            price: z.number().int(),
            max: z.number().int(),
            modulePrice: z.number().int(),
            value: z.array(z.number().int()).optional(),
        }),
    ),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

export function PlanForm({ plan }: { plan: Plan }) {
    const navigate = useNavigate();

    const form = useForm<PlanFormValues>({
        resolver: zodResolver(planFormSchema),
        defaultValues: {
            extras: plan.extras.map((item) => {
                const modulePrice = plan[item.title as "members" | "teams" | "projects"];
                return {
                    ...item,
                    modulePrice,
                    value: [modulePrice],
                };
            }),
        },
        mode: "onChange",
    });

    const { fields } = useFieldArray({
        name: "extras",
        control: form.control,
    });

    async function onSubmit(data: PlanFormValues) {
        const { onDone, onError } = await new HandleRequest(data).post("https://jsonplaceholder.typicode.com/users");
        onDone(() => {
            sessionStorage.setItem(
                "planCheckout",
                JSON.stringify({
                    ...plan,
                    data,
                }),
            );
            navigate("/pricing/checkout");
        });
        onError(() =>
            toast({
                variant: "destructive",
                title: "An error occured!",
            }),
        );
    }

    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                {fields.map((item, i) => (
                    <div key={item.id} className="space-y-8">
                        <div className="grid grid-cols-12">
                            <div className="col-span-3">
                                <h3 className="font-semibold leading-4">{UpperFirst(item.title)}</h3>
                                <p className="text-sm text-muted-foreground">
                                    You can add more {item.title} for ${item.price}
                                </p>
                            </div>
                            <div className="col-span-6 space-y-4">
                                <FormField
                                    control={form.control}
                                    name={`extras.${i}.value`}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex flex-col">
                                                <FormControl>
                                                    <Slider
                                                        step={item.ammount}
                                                        min={item.modulePrice}
                                                        max={item.modulePrice + item.max}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    {UpperFirst(item.title)}: {field.value}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <Separator />
                    </div>
                ))}
                <SubmitButton label="Continue" type="submit" state={form.formState.isSubmitting ? "loading" : "initial"} />
            </form>
        </Form>
    );
}
