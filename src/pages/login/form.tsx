import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Button, buttonVariants } from "components/ui/button";
import { Input } from "components/ui/input";
import { toast } from "components/ui/toast/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInSchema, signInSchema } from "adapters/auth";
import { UserData, useUserData } from "components/shared/user-data-provider";
import { HandleRequest } from "lib/handle-request";
import { errorToast } from "components/shared/error-toast";
import { useLanguage } from "components/shared/language-provider";
import { Logo } from "components/shared/logo";
import { cn } from "lib/utils";
import { PasswordInput } from "components/shared/password-input";

export function LoginInForm() {
    const { language, writeLang } = useLanguage();
    const { setUserData } = useUserData();
    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        mode: "onChange",
    });

    async function onSubmit(data: SignInSchema) {
        const request = await new HandleRequest(data).post(`/auth/sign-in`, { language });

        request.onDone((response) => {
            setUserData(response as unknown as UserData);

            toast({
                title: writeLang([
                    ["en", "You accessed console!"],
                    ["pt", "Você acessou o console!"],
                ]) as string,
            });

            form.reset({
                email: "",
                password: "",
            });

            return navigate("/");
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-12 gap-1">
                        <div className="col-span-12">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder={
                                                    writeLang([
                                                        ["en", "name@example.com"],
                                                        ["pt", "nome@exemplo.com.br"],
                                                    ]) as string
                                                }
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                onChange={field.onChange}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <div className="flex">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormControl>
                                            <PasswordInput
                                                passwordVisible={passwordVisible}
                                                setPasswordVisible={setPasswordVisible}
                                                onChange={field.onChange}
                                                value={field.value || ""}
                                                placeholder={
                                                    writeLang([
                                                        ["en", "Your password"],
                                                        ["pt", "Sua senha"],
                                                    ]) as string
                                                }
                                            />
                                        </FormControl>
                                        <div className="flex">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="w-full text-end pt-2">
                        <Button className="gap-x-1 w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <Loader size={14} className="animate-spin" />}
                            {writeLang([
                                ["en", "Sign In with Email"],
                                ["pt", "Entrar com E-mail"],
                            ])}
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        {writeLang([
                            ["en", "Or Go To"],
                            ["pt", "Ou Ir para"],
                        ])}
                    </span>
                </div>
            </div>
            <Link
                to="https://meunovoapp.com.br"
                target="_blank"
                className={cn(buttonVariants({ variant: "outline" }), "font-semibold text-xs")}
            >
                <Logo iconOnly />
                MeuNovoApp
            </Link>
        </>
    );
}
