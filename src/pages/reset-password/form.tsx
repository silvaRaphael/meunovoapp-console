import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { SubmitButton } from "../../components/shared/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { HandleRequest } from "../../lib/handle-request";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "components/shared/language-provider";
import { UpdatePasswordSchema, updatePasswordSchema } from "adapters/user";
import { errorToast } from "components/shared/error-toast";
import { Button } from "components/ui/button";

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
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormControl>
                                    <div className="flex space-x-2">
                                        <Input
                                            type={!passwordVisible[0] ? "password" : "text"}
                                            placeholder="Sua nova senha"
                                            maxLength={20}
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="bg-muted/80"
                                            onClick={() =>
                                                setPasswordVisible([!passwordVisible[0], passwordVisible[1]])
                                            }
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
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormControl>
                                    <div className="flex space-x-2">
                                        <Input
                                            type={!passwordVisible[1] ? "password" : "text"}
                                            placeholder="Confirme sua senha"
                                            maxLength={20}
                                            onChange={field.onChange}
                                            value={field.value || ""}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="bg-muted/80"
                                            onClick={() =>
                                                setPasswordVisible([passwordVisible[0], !passwordVisible[1]])
                                            }
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
            </form>
        </Form>
    );
}
