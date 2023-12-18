import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { SubmitButton } from "../../components/shared/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { Separator } from "../../components/ui/separator";
import { Label } from "../../components/ui/label";
import { useTheme } from "../../components/shared/theme-provider";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Laptop, MoonIcon, SunIcon } from "lucide-react";
import { useLanguage } from "components/shared/language-provider";
import { Switch } from "components/ui/switch";
import { PreferencesSchema, preferencesSchema } from "adapters/preferences";
// import { HandleRequest } from "lib/handle-request";
// import { BASE_API } from "config/constants";
// import { errorToast } from "components/shared/error-toast";
import { useAuth } from "components/shared/auth-provider";

export function PreferencesForm({ preferences }: { preferences: PreferencesSchema }) {
    const { theme, setTheme } = useTheme();
    const { auth } = useAuth();
    const { writeLang } = useLanguage();

    const form = useForm<PreferencesSchema>({
        resolver: zodResolver(preferencesSchema),
        defaultValues: {
            // emailNotification: preferences.emailNotification,
            emailNotification: false,
            themeMode: theme,
        },
        mode: "onChange",
    });

    async function onSubmit(data: PreferencesSchema) {
        if (!auth) return;

        // const request = await new HandleRequest({
        //     email_notification: data.emailNotification,
        // }).put(`${BASE_API}/preferences`, {
        //     token: auth?.token,
        // });

        // request.onDone(() => {
        setTheme(data.themeMode!);

        toast({
            variant: "success",
            title: writeLang([
                ["en", "Preferences updated successfully!"],
                ["pt", "Preferências atualizadas com sucesso!"],
            ]) as string,
        });
        // });

        // request.onError((error) => errorToast(error));
    }

    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                ["en", "Notifications"],
                                ["pt", "Notificações"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change your notification preferences"],
                                ["pt", "Altere suas preferências de notificações"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="emailNotification"
                            disabled
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="emailNotifications"
                                                checked={field.value}
                                                name={field.name}
                                                ref={field.ref}
                                                onCheckedChange={field.onChange}
                                                disabled
                                            />
                                            <Label htmlFor="emailNotifications">
                                                <FormDescription>
                                                    {writeLang([
                                                        [
                                                            "en",
                                                            <>
                                                                {field.value ? "Disable" : "Enable"} email notifications
                                                            </>,
                                                        ],
                                                        [
                                                            "pt",
                                                            <>
                                                                {field.value ? "Desabilitar" : "Habilitar"} notificações
                                                                de e-mail
                                                            </>,
                                                        ],
                                                    ])}
                                                </FormDescription>
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
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                ["en", "Theme"],
                                ["pt", "Tema"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change your theme preferences"],
                                ["pt", "Altere sua preferência de tema"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="themeMode"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <RadioGroup
                                            ref={field.ref}
                                            name={field.name}
                                            onChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-4 gap-4"
                                        >
                                            <div>
                                                <RadioGroupItem value="system" id="system" className="peer sr-only" />
                                                <Label
                                                    htmlFor="system"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                >
                                                    <Laptop size={16} className="mb-3" />
                                                    {writeLang([
                                                        ["en", "System"],
                                                        ["pt", "Sistema"],
                                                    ])}
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                                                <Label
                                                    htmlFor="light"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                >
                                                    <SunIcon size={16} className="mb-3" />
                                                    {writeLang([
                                                        ["en", "Light"],
                                                        ["pt", "Claro"],
                                                    ])}
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                                                <Label
                                                    htmlFor="dark"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                >
                                                    <MoonIcon size={16} className="mb-3" />
                                                    {writeLang([
                                                        ["en", "Dark"],
                                                        ["pt", "Escuro"],
                                                    ])}
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Pick a theme mode"],
                                            ["pt", "Escolha um modo"],
                                        ])}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <SubmitButton
                    label={
                        writeLang([
                            ["en", "Update Preferences"],
                            ["pt", "Atualizar Preferências"],
                        ]) as string
                    }
                    type="submit"
                    state={form.formState.isSubmitting ? "loading" : "initial"}
                />
            </form>
        </Form>
    );
}
