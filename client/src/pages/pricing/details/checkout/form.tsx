import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../../components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "../../../../components/ui/table";
import { SubmitButton } from "../../../../components/submit-button";
import { toast } from "../../../../components/ui/toast/use-toast";
import { HandleRequest } from "../../../../lib/handle-request";
import { Separator } from "../../../../components/ui/separator";
import { Label } from "../../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { Calendar, CalendarDays, CheckCircle2, CreditCard, File } from "lucide-react";
import { PlanExtra } from "../../data/plan";
import { Badge } from "../../../../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../components/language-provider";
import { ReactNode } from "react";
import { Input, MaskedInput } from "../../../../components/ui/input";
import { UpperFirst } from "../../../../lib/helper";
import { addMonths, format } from "date-fns";
import { languages } from "../../../../config/languages";

const checkoutFormSchema = z.object({
    emailNotification: z.boolean(),
    mobileNotification: z.boolean(),
    billingMode: z.enum(["yearly", "monthly"]),
    paymentMethod: z.any(),
    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    cardYear: z.string().optional(),
    cardMonth: z.string().optional(),
    cardCVV: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export function CheckoutForm({ plan, total }: { plan: any; total: number }) {
    const { language, writeLang } = useLanguage();
    const navigate = useNavigate();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            emailNotification: true,
            mobileNotification: false,
            billingMode: "monthly",
            paymentMethod: "card",
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
                // description: (
                //     <pre>
                //         <code>{JSON.stringify(data, null, 2)}</code>
                //     </pre>
                // ),
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
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-12">
                            <div className="col-span-2">
                                <h3 className="font-semibold leading-4">
                                    {writeLang([
                                        ["en", "Billing"],
                                        ["pt", "Cobrança"],
                                    ])}
                                </h3>
                            </div>
                            <div className="col-span-9 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="billingMode"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormControl>
                                                <RadioGroup
                                                    ref={field.ref}
                                                    name={field.name}
                                                    onChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="grid grid-cols-2 gap-4"
                                                >
                                                    <div className="flex flex-col w-full">
                                                        <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                                                        <Label
                                                            htmlFor="monthly"
                                                            className="flex flex-col justify-between h-full rounded-md border-2 border-muted bg-popover p-4 space-y-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                        >
                                                            <div className="flex items-center justify-start opacity-70 text-xs">
                                                                <CalendarDays size={14} className="me-2" />
                                                                {writeLang([
                                                                    ["en", "Pay monthly"],
                                                                    ["pt", "Pagar mensal"],
                                                                ])}
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                {total.toLocaleString(language.locale, { currency: language.currency, style: "currency" })}/
                                                                {writeLang([
                                                                    ["en", "month"],
                                                                    ["pt", "mês"],
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
                                                                    ["en", "Pay yearly"],
                                                                    ["pt", "Pagar anual"],
                                                                ])}
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                {(total * 0.9).toLocaleString(language.locale, { currency: language.currency, style: "currency" })}/
                                                                {writeLang([
                                                                    ["en", "month"],
                                                                    ["pt", "mês"],
                                                                ])}
                                                                <Badge variant="success" className="flex flex-shrink-0 pointer-events-none text-center ms-2">
                                                                    {writeLang([
                                                                        ["en", "Save 10%"],
                                                                        ["pt", "Economize 10%"],
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

                        <div className="grid grid-cols-12">
                            <div className="col-span-2">
                                <h3 className="font-semibold leading-4">
                                    {writeLang([
                                        ["en", "Payment"],
                                        ["pt", "Pagamento"],
                                    ])}
                                </h3>
                            </div>
                            <div className="col-span-9 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormControl>
                                                <RadioGroup
                                                    ref={field.ref}
                                                    name={field.name}
                                                    onChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="grid grid-cols-3 gap-4"
                                                >
                                                    <PaymentMethodCard
                                                        name="card"
                                                        icon={<CreditCard size={24} className="me-2" />}
                                                        label={writeLang([
                                                            ["en", "Card"],
                                                            ["pt", "Cartão"],
                                                        ])}
                                                    />
                                                    <PaymentMethodCard name="paypal" icon={<CreditCard size={24} className="me-2" />} label={<>Paypal</>} />
                                                    {language.locale === "pt-BR" && (
                                                        <PaymentMethodCard name="boleto" icon={<File size={24} className="me-2" />} label={<>Boleto</>} />
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {form.getValues("paymentMethod") === "card" && (
                                    <div className="space-y-4">
                                        <Separator />
                                        <FormField
                                            control={form.control}
                                            name="cardName"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormControl>
                                                        <Input
                                                            placeholder={
                                                                writeLang([
                                                                    ["en", "Card name"],
                                                                    ["pt", "Nome no cartão"],
                                                                ]) as string
                                                            }
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="cardNumber"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormControl>
                                                        <MaskedInput
                                                            mask="9999 9999 9999 9999"
                                                            placeholder={
                                                                writeLang([
                                                                    ["en", "Card number"],
                                                                    ["pt", "Número do cartão"],
                                                                ]) as string
                                                            }
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-3 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="cardYear"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormControl>
                                                            <MaskedInput
                                                                mask="9999"
                                                                placeholder={
                                                                    writeLang([
                                                                        ["en", "Year"],
                                                                        ["pt", "Ano"],
                                                                    ]) as string
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="cardMonth"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormControl>
                                                            <MaskedInput
                                                                mask="99"
                                                                placeholder={
                                                                    writeLang([
                                                                        ["en", "Month"],
                                                                        ["pt", "Mês"],
                                                                    ]) as string
                                                                }
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="cardCVV"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormControl>
                                                            <MaskedInput mask="999" placeholder="CVV" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Separator />
                        <SubmitButton
                            label={
                                writeLang([
                                    ["en", "Confirm"],
                                    ["pt", "Confirmar"],
                                ]) as string
                            }
                            type="submit"
                            state={form.formState.isSubmitting ? "loading" : "initial"}
                        />
                    </form>
                </Form>
            </div>
            <Card className="bg-accent h-min">
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
                        {!plan?.data?.extras
                            ? Object.entries(plan)
                                  .filter((item: [string, any]) => ["members", "projects", "teams"].includes(item[0]))
                                  .map((item: [string, any], i: number) => (
                                      <div key={i} className="flex items-center">
                                          <>
                                              <CheckCircle2 size={16} className="me-2" />
                                              {item[1]} {item[0]}
                                          </>
                                      </div>
                                  ))
                            : plan.data?.extras
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
                            {plan.data?.extras.map((item: PlanExtra & { modulePrice: number; value: number[] }, i: number) => (
                                <TableRow key={i} className="text-xs h-8 dark:border-b-neutral-900">
                                    <TableCell>{UpperFirst(item.title)}</TableCell>
                                    <TableCell className="text-end">{item.value[0]}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="text-sm font-medium h-12">
                                <TableCell className="font-bold">Total</TableCell>
                                <TableCell className="font-bold text-end">
                                    {(!plan.data?.extras
                                        ? plan.price
                                        : plan.data?.extras.reduce((acc: any, crr: any) => ((crr.value[0] - crr.modulePrice) / crr.ammount) * crr.price + acc, 0) + plan.price
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
    );
}

const PaymentMethodCard = ({ name, icon, label }: { name: string; icon: ReactNode; label: ReactNode }) => (
    <div className="flex flex-col w-full">
        <RadioGroupItem value={name} id={name} className="peer sr-only" />
        <Label
            htmlFor={name}
            className="flex flex-col justify-center h-full rounded-md border-2 border-muted bg-popover p-4 space-y-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
            <div className="flex items-center justify-start text-lg">
                {icon}
                {label}
            </div>
        </Label>
    </div>
);
