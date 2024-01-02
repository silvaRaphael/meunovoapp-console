import { Section } from "components/shared/section";
import { Logo } from "components/shared/logo";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HandleRequest } from "lib/handle-request";
import { useUserData } from "components/shared/user-data-provider";
import { toast } from "components/ui/toast/use-toast";
import { ResetPasswordForm } from "./form";
import { Button } from "components/ui/button";
import { useLanguage } from "components/shared/language-provider";

export function ResetPassword() {
    document.title = "Recuperar Senha - Console | MeuNovoApp";

    const { language, writeLang } = useLanguage();
    const { userData, removeUserData } = useUserData();

    const navigate = useNavigate();

    const passwordKey = new URL(window.location.href).searchParams.get("p");

    const [loading, setLoading] = useState<boolean>(true);

    async function canReset() {
        if (!passwordKey) return navigate("/login");

        const request = await new HandleRequest().get(`/users/can-reset-password/${encodeURIComponent(passwordKey)}`, {
            language,
        });

        request.onDone(() => {
            setLoading(false);
        });

        request.onError(() => {
            return navigate("/login");
        });
    }

    useEffect(() => {
        if (!passwordKey) navigate("/login");

        if (userData?.email) {
            removeUserData();

            (async () => {
                const request = await new HandleRequest().get(`/auth/sign-out`, { language });

                request.onDone(() => {
                    toast({
                        title: writeLang([
                            ["en", "You left console!"],
                            ["pt", "Você saiu do console!"],
                        ]) as string,
                    });
                });
            })();
        }

        canReset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!passwordKey || loading) return <></>;

    return (
        <div className="flex min-h-screen items-center w-full">
            <Section size="tiny" className="space-y-6">
                <div className="space-y-10">
                    <div className="space-y-3 w-full">
                        <Logo className="justify-center" />
                        <h4 className="text-muted-foreground leading-5 text-center mx-auto">Defina sua senha</h4>
                    </div>
                    <ResetPasswordForm passwordKey={passwordKey} />
                </div>
                <Button variant="outline" className="w-full text-muted-foreground" asChild>
                    <Link to="/login">Fazer login</Link>
                </Button>
            </Section>
        </div>
    );
}
