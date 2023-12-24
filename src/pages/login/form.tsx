import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { toast } from "components/ui/toast/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInSchema, signInSchema } from "adapters/auth";
import { UserData, useUserData } from "components/shared/user-data-provider";
import { HandleRequest } from "lib/handle-request";
import { errorToast } from "components/shared/error-toast";

export function LoginInForm() {
    const navigate = useNavigate();
    const { setUserData } = useUserData();

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        mode: "onChange",
    });

    async function onSubmit(data: SignInSchema) {
        const request = await new HandleRequest(data).post(`/auth/sign-in`);

        request.onDone((response) => {
            setUserData(response as unknown as UserData);

            toast({
                title: "Você acessou o console!",
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
        <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Seu e-mail"
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
                                        <div className="flex space-x-2">
                                            <Input
                                                type={!passwordVisible ? "password" : "text"}
                                                placeholder="Sua senha"
                                                maxLength={20}
                                                onChange={field.onChange}
                                                value={field.value || ""}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="bg-muted/80"
                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                            >
                                                {!passwordVisible ? <Eye size={14} /> : <EyeOff size={14} />}
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
                <div className="w-full text-end pt-4">
                    <Button className="gap-x-1 w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Loader size={14} className="animate-spin" />}
                        Entrar
                    </Button>
                </div>
            </form>
        </Form>
    );
}
