import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../../components/ui/form";
import { SubmitButton } from "../../../../components/submit-button";
import { toast } from "../../../../components/ui/toast/use-toast";
import { HandleRequest } from "../../../../lib/handle-request";
import { Separator } from "../../../../components/ui/separator";
import { Label } from "../../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { Calendar, CalendarDays } from "lucide-react";
import { Plan } from "../../data/plan";
import { Badge } from "../../../../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../components/language-provider";

const checkoutFormSchema = z.object({
    emailNotification: z.boolean(),
    mobileNotification: z.boolean(),
    billingMode: z.enum(["yearly", "monthly"]),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export function CheckoutForm({ plan, total }: { plan: Plan; total: number }) {
    const { language, writeLang } = useLanguage();
    const navigate = useNavigate();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            emailNotification: true,
            mobileNotification: false,
            billingMode: "monthly",
        },
        mode: "onChange",
    });

    async function onSubmit(data: CheckoutFormValues) {
        const { onDone, onError } = await new HandleRequest(data).post("https://jsonplaceholder.typicode.com/users");
        onDone(() => {
            toast({
                variant: "success",
                title: "Your plan was updated successfully!",
                description: "You will receive an email soon.",
            });
            navigate("/pricing");
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
                <div className="grid grid-cols-12">
                    <div className="col-span-2">
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                { lang: "en", text: "Billing" },
                                { lang: "pt", text: "Cobrança" },
                            ])}
                        </h3>
                    </div>
                    <div className="col-span-8 space-y-4">
                        <FormField
                            control={form.control}
                            name="billingMode"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <RadioGroup ref={field.ref} name={field.name} onChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col w-full">
                                                <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                                                <Label
                                                    htmlFor="monthly"
                                                    className="flex flex-col justify-between h-full rounded-md border-2 border-muted bg-popover p-4 space-y-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                >
                                                    <div className="flex items-center justify-start opacity-70 text-xs">
                                                        <CalendarDays size={14} className="me-2" />
                                                        {writeLang([
                                                            { lang: "en", text: "Pay monthly" },
                                                            { lang: "pt", text: "Pagar mensal" },
                                                        ])}
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        {total.toLocaleString(language.locale, { currency: language.currency, style: "currency" })}/
                                                        {writeLang([
                                                            { lang: "en", text: "month" },
                                                            { lang: "pt", text: "mês" },
                                                        ])}
                                                    </div>
                                                </Label>
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
                                                <Label
                                                    htmlFor="yearly"
                                                    className="flex flex-col justify-between h-full rounded-md border-2 border-muted bg-popover p-4 space-y-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                >
                                                    <div className="flex items-center justify-start opacity-70 text-xs">
                                                        <Calendar size={14} className="me-2" />
                                                        {writeLang([
                                                            { lang: "en", text: "Pay yearly" },
                                                            { lang: "pt", text: "Pagar anual" },
                                                        ])}
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        {(total * 0.9).toLocaleString(language.locale, { currency: language.currency, style: "currency" })}/
                                                        {writeLang([
                                                            { lang: "en", text: "month" },
                                                            { lang: "pt", text: "mês" },
                                                        ])}
                                                        <Badge variant="success" className="flex flex-shrink-0 pointer-events-none text-center ms-2">
                                                            {writeLang([
                                                                { lang: "en", text: "Save 10%" },
                                                                { lang: "pt", text: "Economize 10%" },
                                                            ])}
                                                        </Badge>
                                                    </div>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <SubmitButton
                    label={writeLang([
                        { lang: "en", text: "Confirm" },
                        { lang: "pt", text: "Confirmar" },
                    ])}
                    type="submit"
                    state={form.formState.isSubmitting ? "loading" : "initial"}
                />
            </form>
        </Form>
    );
}
