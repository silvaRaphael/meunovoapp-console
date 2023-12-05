import { useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { Page } from "../../../components/shared/page";
import { useLanguage } from "../../../components/shared/language-provider";
import { templates } from "../data/data";
import { HandleRequest } from "lib/handle-request";
import { BASE_API, SENDER_EMAIL } from "config/constants";
import { useAuth } from "components/shared/auth-provider";
import { useState } from "react";
import { SubmitButton } from "components/shared/submit-button";
import { errorToast } from "components/shared/error-toast";
import { toast } from "components/ui/toast/use-toast";

export function TemplateDetails() {
    const { auth } = useAuth();
    const { writeLang } = useLanguage();
    const { id } = useParams();

    const template = templates.find((item) => item.id === id);

    const [status, setStatus] = useState<"initial" | "loading">("initial");

    async function sendTestEmail() {
        if (!template?.component) return;

        setStatus("loading");

        const request = await new HandleRequest({
            name: "Teste",
            from: SENDER_EMAIL,
            to: [auth?.email],
            subject: `E-mail de teste - MeuNovoApp`,
            html: template?.component,
            no_save: true,
        }).post(`${BASE_API}/emails`, {
            token: auth?.token,
        });

        request.onDone(() => {
            toast({
                title: writeLang([
                    ["en", "Test sent successfully!"],
                    ["pt", "Teste enviado com sucesso!"],
                ]) as string,
                description: writeLang([
                    ["en", `Sent to ${auth?.email}`],
                    ["pt", `Enviado para ${auth?.email}`],
                ]) as string,
            });
        });

        request.onError((error) => {
            errorToast(error);
        });

        setStatus("initial");
    }

    if (!template) return <></>;

    return (
        <Page
            pathname={
                writeLang([
                    ["en", "/templates"],
                    ["pt", "/modelos"],
                ]) as string
            }
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", "Templates"],
                            ["pt", "Modelos"],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/templates"],
                            ["pt", "/modelos"],
                        ]) as string
                    }
                    tree={!!template ? [{ label: template.name }] : []}
                >
                    <SubmitButton
                        label={
                            writeLang([
                                ["en", "Send Test"],
                                ["pt", "Enviar Teste"],
                            ]) as string
                        }
                        onSubmit={sendTestEmail}
                        state={status}
                    />
                </SectionHeader>
            }
        >
            <div className="space-y-6 pb-40">
                <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                        __html: template.component?.replace(/\n/g, "<br />"),
                    }}
                />
            </div>
        </Page>
    );
}
