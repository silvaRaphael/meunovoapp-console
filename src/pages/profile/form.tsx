import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { SubmitButton } from "../../components/shared/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { HandleRequest } from "../../lib/handle-request";
import { User } from "../../config/user";
import { Separator } from "../../components/ui/separator";
import { ProfileSchema, profileSchema } from "adapters/user";
import { errorToast } from "components/shared/error-toast";
import { useLanguage } from "components/shared/language-provider";
import { useAuth } from "components/shared/auth-provider";
import { BASE_API } from "config/constants";

let usernameTimeout: any;

export function ProfileForm({ user }: { user: User }) {
    const { auth } = useAuth();
    const { writeLang } = useLanguage();

    const form = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            role: user.role,
            // avatar: user.avatar,
        },
        mode: "onChange",
    });

    async function checkEmailAvailability(e: React.ChangeEvent<HTMLInputElement>) {
        const email = e.target.value;

        const request = await new HandleRequest({ email }).post(`${BASE_API}/users/email`, {
            token: auth?.token,
        });

        request.onDone(() => {
            if (email.trim() === "existent")
                form.setError("email", {
                    message: writeLang([
                        ["en", "Email not available"],
                        ["pt", "E-mail não disponível"],
                    ]) as string,
                });
        });

        request.onError((error) => errorToast(error));
    }

    async function onSubmit(data: ProfileSchema) {
        const request = await new HandleRequest(data).post(`${BASE_API}/users`, {
            token: auth?.token,
        });

        request.onDone(() =>
            toast({
                title: writeLang([
                    ["en", "Profile updated successfully!"],
                    ["pt", "Perfil atualizado com sucesso!"],
                ]) as string,
            }),
        );

        request.onError((error) => errorToast(error));
    }

    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                ["en", "Name"],
                                ["pt", "Nome"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change your name"],
                                ["pt", "Altere seu nome"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Enter you name"],
                                            ["pt", "Digite seu nome"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Your name"],
                                                    ["pt", "Seu nome"],
                                                ]) as string
                                            }
                                            {...field}
                                        />
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
                                ["en", "Info"],
                                ["pt", "Informações"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change your informations"],
                                ["pt", "Altere suas informações"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Enter your email"],
                                            ["pt", "Digite seu e-mail"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Your email"],
                                                    ["pt", "Seu e-mail"],
                                                ]) as string
                                            }
                                            onChange={(e) => {
                                                if (e.target.value.includes(" ")) e.target.value = e.target.value.replaceAll(" ", "");
                                                field.onChange(e);
                                                clearTimeout(usernameTimeout);
                                                usernameTimeout = setTimeout(() => checkEmailAvailability(e), 500);
                                            }}
                                            name={field.name}
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Upload your avatar image"],
                                            ["pt", "Envie sua imagem de perfil"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Pick a photo"],
                                                    ["pt", "Escolha uma foto"],
                                                ]) as string
                                            }
                                            type="file"
                                            lang="en"
                                            className="file:text-neutral-800 dark:file:text-neutral-100 file:border-r file:border-neutral-200 file:h-full file:me-2"
                                            {...field}
                                        />
                                    </FormControl>
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
                            ["en", "Update Profile"],
                            ["pt", "Atualizar Perfil"],
                        ]) as string
                    }
                    type="submit"
                    state={form.formState.isSubmitting ? "loading" : "initial"}
                />
            </form>
        </Form>
    );
}
