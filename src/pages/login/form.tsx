import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { toast } from "components/ui/toast/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signInSchema } from "adapters/auth";
import { BASE_API } from "config/constants";
import { useAuth } from "components/shared/auth-provider";

export type SignInSchema = z.infer<typeof signInSchema>;

export function LoginInForm() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        mode: "onChange",
    });

    async function onSubmit(data: SignInSchema) {
        try {
            const response = await fetch(`${BASE_API}/auth/sign-in`, {
                mode: "no-cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw (await response.json()).error;
            }

            const user = await response.json();

            setAuth(user);

            toast({
                title: "Você acessou o console!",
            });

            form.reset({
                email: "",
                password: "",
            });

            return navigate("/");
        } catch (error: any) {
            toast({
                title: "Ocorreu algum erro!",
                description:
                    error.length &&
                    error.map(({ message }: any, i: number) => (
                        <Fragment key={i}>
                            {message}
                            <br />
                        </Fragment>
                    )),
                variant: "destructive",
            });
        }
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
                                                type={!passwordVisible ? "password" : "text"}
                                                placeholder="Sua senha"
                                                maxLength={20}
                                                onChange={field.onChange}
                                                value={field.value || ""}
                                            />
                                            <Button type="button" variant="outline" className="bg-muted/80" onClick={() => setPasswordVisible(!passwordVisible)}>
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
