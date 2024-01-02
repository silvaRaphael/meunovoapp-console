import { Section } from "components/shared/section";
import { CompleteProfileForm } from "./form";
import { Logo } from "components/shared/logo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleRequest } from "lib/handle-request";
import { useUserData } from "components/shared/user-data-provider";
import { toast } from "components/ui/toast/use-toast";
import { useLanguage } from "components/shared/language-provider";

export function CompleteProfile() {
    document.title = "Começar - Console | MeuNovoApp";

    const { writeLang } = useLanguage();
    const { userData, removeUserData } = useUserData();

    const navigate = useNavigate();

    const id = new URL(window.location.href).searchParams.get("u");

    const [loading, setLoading] = useState<boolean>(true);
    const [userEmail, setUserEmail] = useState<string>("");

    async function canUpdate() {
        const request = await new HandleRequest().get(`/users/can-update/${id}`);

        request.onDone((response) => {
            setUserEmail(response.email);
            setLoading(false);
        });

        request.onError(() => {
            navigate("/login");
        });
    }

    useEffect(() => {
        if (!id) navigate("/login");

        if (userData?.email) {
            removeUserData();

            (async () => {
                const request = await new HandleRequest().get(`/auth/sign-out`);

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

        canUpdate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!id || loading) return <></>;

    return (
        <div className="flex min-h-screen items-center w-full">
            <Section size="sm" className="space-y-10">
                <div className="space-y-3 w-full">
                    <Logo className="justify-center" />
                    <h4 className="text-muted-foreground leading-5 text-center mx-auto">Complete seu perfil</h4>
                </div>
                <CompleteProfileForm id={id} email={userEmail} />
            </Section>
        </div>
    );
}
