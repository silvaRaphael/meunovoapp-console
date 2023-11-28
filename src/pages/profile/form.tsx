import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { SubmitButton } from "../../components/shared/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { HandleRequest } from "../../lib/handle-request";
import { Separator } from "../../components/ui/separator";
import { errorToast } from "components/shared/error-toast";
import { useLanguage } from "components/shared/language-provider";
import { useAuth } from "components/shared/auth-provider";
import { BASE_API } from "config/constants";
import { useState } from "react";
import { Button } from "components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { UpdateUserSchema, updateUserSchema } from "adapters/user";

let usernameTimeout: any;

export function ProfileForm() {
    const { auth, setAuth } = useAuth();
    const { writeLang } = useLanguage();

    const [passwordVisible, setPasswordVisible] = useState<boolean[]>([false, false]);

    const form = useForm<UpdateUserSchema>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: auth?.name,
            email: auth?.email,
        },
        mode: "onChange",
    });

    async function checkEmailAvailability(e: React.ChangeEvent<HTMLInputElement>) {
        const email = e.target.value;

        if (!email.length) return;

        const request = await new HandleRequest({ email }).post(`${BASE_API}/users/can-use-email`, {
            token: auth?.token,
        });

        request.onError(() => {
            form.setError("email", {
                message: writeLang([
                    ["en", "Email not available"],
                    ["pt", "E-mail não disponível"],
                ]) as string,
            });
        });
    }

    async function onSubmit(data: UpdateUserSchema) {
        if (!auth) return;

        const request = await new HandleRequest(data).put(`${BASE_API}/users`, {
            token: auth?.token,
        });

        request.onDone(() => {
            setAuth({
                name: data.name,
                email: data.email,
                role: auth?.role,
                token: auth?.token,
            });

            toast({
                title: writeLang([
                    ["en", "Profile updated successfully!"],
                    ["pt", "Perfil atualizado com sucesso!"],
                ]) as string,
            });

            form.reset({
                name: data.name,
                email: data.email,
                old_password: "",
                password: "",
            });
        });

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
                                            ["en", "Enter your name"],
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
                                                usernameTimeout = setTimeout(() => checkEmailAvailability(e), 1000);
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
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                ["en", "Password"],
                                ["pt", "Senha"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change your password"],
                                ["pt", "Altere sua senha"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="old_password"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <div className="flex space-x-2">
                                            <Input
                                                type={!passwordVisible[0] ? "password" : "text"}
                                                placeholder={
                                                    writeLang([
                                                        ["en", "Old password"],
                                                        ["pt", "Senha antiga"],
                                                    ]) as string
                                                }
                                                maxLength={20}
                                                onChange={field.onChange}
                                                value={field.value || ""}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="bg-muted/80"
                                                onClick={() => setPasswordVisible([!passwordVisible[0], passwordVisible[1]])}
                                            >
                                                {!passwordVisible[0] ? <Eye size={14} /> : <EyeOff size={14} />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <div className="flex">
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <div className="flex space-x-2">
                                            <Input
                                                type={!passwordVisible[1] ? "password" : "text"}
                                                placeholder={
                                                    writeLang([
                                                        ["en", "New password"],
                                                        ["pt", "Nova senha"],
                                                    ]) as string
                                                }
                                                maxLength={20}
                                                onChange={field.onChange}
                                                value={field.value || ""}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="bg-muted/80"
                                                onClick={() => setPasswordVisible([passwordVisible[0], !passwordVisible[1]])}
                                            >
                                                {!passwordVisible[1] ? <Eye size={14} /> : <EyeOff size={14} />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <div className="flex">
                                        <FormMessage />
                                    </div>
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
