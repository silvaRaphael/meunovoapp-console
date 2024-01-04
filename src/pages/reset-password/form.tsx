import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { SubmitButton } from "../../components/shared/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { HandleRequest } from "../../lib/handle-request";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "components/shared/language-provider";
import { UpdatePasswordSchema, updatePasswordSchema } from "adapters/user";
import { errorToast } from "components/shared/error-toast";
import { buttonVariants } from "components/ui/button";
import { cn } from "lib/utils";
import { PasswordInput } from "components/shared/password-input";

export function ResetPasswordForm({ passwordKey }: { passwordKey: string }) {
    const navigate = useNavigate();
    const { language, writeLang } = useLanguage();

    const [passwordVisible, setPasswordVisible] = useState<boolean[]>([false, false]);

    const form = useForm<UpdatePasswordSchema>({
        resolver: zodResolver(updatePasswordSchema),
        mode: "onChange",
    });

    async function onSubmit(data: UpdatePasswordSchema) {
        const request = await new HandleRequest(data).put(`/users/reset-password/${encodeURIComponent(passwordKey)}`, {
            language,
        });

        request.onDone(() => {
            toast({
                title: "Você restaurou sua senha!",
                description: "Entre com sua nova senha.",
            });

            form.reset({
                password: "",
                confirm_password: "",
            });

            navigate("/login");
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    return (
        <>
            <Form {...form}>
                <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <PasswordInput
                                            passwordVisible={passwordVisible[0]}
                                            setPasswordVisible={() =>
                                                setPasswordVisible([!passwordVisible[0], passwordVisible[1]])
                                            }
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                            placeholder={
                                                writeLang([
                                                    ["en", "Your new password"],
                                                    ["pt", "Sua nova senha"],
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
                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <PasswordInput
                                            passwordVisible={passwordVisible[1]}
                                            setPasswordVisible={() =>
                                                setPasswordVisible([passwordVisible[0], !passwordVisible[1]])
                                            }
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                            placeholder={
                                                writeLang([
                                                    ["en", "Confirm your password"],
                                                    ["pt", "Confirme sua senha"],
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
                    <div className="w-full">
                        <SubmitButton
                            label={
                                writeLang([
                                    ["en", "Reset password"],
                                    ["pt", "Redefinir senha"],
                                ]) as string
                            }
                            type="submit"
                            state={form.formState.isSubmitting ? "loading" : "initial"}
                            className="w-full"
                        />
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
            <Link to="/login" className={cn(buttonVariants({ variant: "outline" }), "font-semibold text-xs")}>
                Login
            </Link>
        </>
    );
}
