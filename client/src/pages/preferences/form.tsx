import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { SubmitButton } from "../../components/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { HandleRequest } from "../../lib/handle-request";
import { User } from "../../config/user";
import { Separator } from "../../components/ui/separator";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { useTheme } from "../../components/theme-provider";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Laptop, MoonIcon, SunIcon } from "lucide-react";

const preferencesFormSchema = z.object({
    emailNotification: z.boolean(),
    mobileNotification: z.boolean(),
    themeMode: z.enum(["system", "light", "dark"]),
});

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

export function PreferencesForm({ user }: { user: User }) {
    const { theme, setTheme } = useTheme();

    const form = useForm<PreferencesFormValues>({
        resolver: zodResolver(preferencesFormSchema),
        defaultValues: {
            emailNotification: true,
            mobileNotification: false,
            themeMode: theme,
        },
        mode: "onChange",
    });

    async function onSubmit(data: PreferencesFormValues) {
        const { onDone, onError } = await new HandleRequest(data).post("https://jsonplaceholder.typicode.com/users");
        onDone(() => {
            toast({
                variant: "success",
                title: "Preferences updated successfully!",
            });
            setTheme(data.themeMode);
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
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">Notification</h3>
                        <p className="text-sm text-muted-foreground">Change notification preferences</p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="emailNotification"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="emailNotifications" checked={field.value} name={field.name} ref={field.ref} onCheckedChange={field.onChange} />
                                            <Label htmlFor="emailNotifications">
                                                <FormDescription>{field.value ? "Disable" : "Enable"} email notifications</FormDescription>
                                            </Label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mobileNotification"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="mobileNotifications" checked={field.value} name={field.name} ref={field.ref} onCheckedChange={field.onChange} />
                                            <Label htmlFor="mobileNotifications">
                                                <FormDescription>{field.value ? "Disable" : "Enable"} mobile notifications</FormDescription>
                                            </Label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">Theme</h3>
                        <p className="text-sm text-muted-foreground">Change your theme preferences</p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="themeMode"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <RadioGroup ref={field.ref} name={field.name} onChange={field.onChange} defaultValue={field.value} className="grid grid-cols-4 gap-4">
                                            <div>
                                                <RadioGroupItem value="system" id="system" className="peer sr-only" />
                                                <Label
                                                    htmlFor="system"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                >
                                                    <Laptop size={16} className="mb-3" />
                                                    System
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                                                <Label
                                                    htmlFor="light"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                >
                                                    <SunIcon size={16} className="mb-3" />
                                                    Light
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                                                <Label
                                                    htmlFor="dark"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                >
                                                    <MoonIcon size={16} className="mb-3" />
                                                    Dark
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormDescription>Pick a theme mode</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <SubmitButton label="Update Preferences" type="submit" state={form.formState.isSubmitting ? "loading" : "initial"} />
            </form>
        </Form>
    );
}
