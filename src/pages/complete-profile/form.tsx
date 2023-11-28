import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { toast } from "components/ui/toast/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BASE_API } from "config/constants";
import { Auth, useAuth } from "components/shared/auth-provider";
import { HandleRequest } from "lib/handle-request";
import { errorToast } from "components/shared/error-toast";
import { CompleteUserSchema, completeUserSchema } from "adapters/user";

export function CompleteProfileForm({ id, email }: { id: string; email: string }) {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const [passwordVisible, setPasswordVisible] = useState<boolean[]>([false, false]);

    const form = useForm<CompleteUserSchema>({
        resolver: zodResolver(completeUserSchema),
        defaultValues: {
            email,
        },
        mode: "onChange",
    });

    async function onSubmit(data: CompleteUserSchema) {
        data.confirm_password = undefined;

        const request = await new HandleRequest(data).put(`${BASE_API}/users/complete/${id}`);

        request.onDone((response) => {
            setAuth(response as unknown as Auth);

            toast({
                title: "Você finalizou seu cadastro!",
            });

            form.reset({
                name: "",
                email: "",
                password: "",
                confirm_password: "",
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
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-12">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <Input placeholder="Seu nome" onChange={field.onChange} value={field.value || ""} autoFocus />
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
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <Input type="email" placeholder="Seu e-mail" onChange={field.onChange} value={field.value || ""} />
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
                                                type={!passwordVisible[0] ? "password" : "text"}
                                                placeholder="Sua senha"
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
                    </div>
                    <div className="col-span-12">
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
                <div className="w-full text-end pt-4">
                    <Button className="gap-x-1 w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Loader size={14} className="animate-spin" />}
                        Finalizar
                    </Button>
                </div>
            </form>
        </Form>
    );
}
