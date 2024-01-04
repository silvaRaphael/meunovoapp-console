import { Logo } from "components/shared/logo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleRequest } from "lib/handle-request";
import { useUserData } from "components/shared/user-data-provider";
import { toast } from "components/ui/toast/use-toast";
import { ResetPasswordForm } from "./form";
import { useLanguage } from "components/shared/language-provider";
import { AuthScreen } from "components/shared/auth-screen";

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
        <AuthScreen
            quote={
                writeLang([
                    ["en", "Set your new password to access your account."],
                    ["pt", "Defina sua nova senha para acessar sua conta."],
                ]) as string
            }
            className="h-96 flex justify-start"
        >
            <div className="flex flex-col space-y-2 mb-2 text-center">
                <Logo className="justify-center" />
                <p className="text-sm text-muted-foreground">
                    {writeLang([
                        ["en", "Reset your password"],
                        ["pt", "Restaure sua senha"],
                    ])}
                </p>
            </div>
            <ResetPasswordForm passwordKey={passwordKey} />
        </AuthScreen>
    );
}
