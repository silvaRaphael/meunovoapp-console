import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { Page } from "../../../components/shared/page";
import { useLanguage } from "../../../components/shared/language-provider";
import { templates } from "../data/data";
import { HandleRequest } from "lib/handle-request";
import { SENDER_EMAIL } from "config/constants";
import { useUserData } from "components/shared/user-data-provider";
import { SubmitButton } from "components/shared/submit-button";
import { errorToast } from "components/shared/error-toast";
import { toast } from "components/ui/toast/use-toast";
import { Input } from "components/ui/input";

export function TemplateDetails() {
    const { userData } = useUserData();
    const { language, writeLang } = useLanguage();
    const navigate = useNavigate();
    const { id } = useParams();

    const template = templates.find((item) => item.id === id);

    const [status, setStatus] = useState<"initial" | "loading">("initial");
    const [copyStatus, setCopyStatus] = useState<"initial" | "loading">("initial");

    async function sendTestEmail() {
        if (!template?.component) return;

        setStatus("loading");

        const request = await new HandleRequest({
            name: "Teste",
            from: SENDER_EMAIL,
            to: [userData?.email],
            subject: `E-mail de teste - MeuNovoApp`,
            html: template?.component,
            no_save: true,
        }).post(`/emails`, { language });

        request.onDone(() => {
            toast({
                title: writeLang([
                    ["en", "Test sent successfully!"],
                    ["pt", "Teste enviado com sucesso!"],
                ]) as string,
                description: writeLang([
                    ["en", `Sent to ${userData?.email}`],
                    ["pt", `Enviado para ${userData?.email}`],
                ]) as string,
            });
        });

        request.onError((error) => {
            errorToast(error);
            if (error.redirect) navigate(error.redirect);
        });

        setStatus("initial");
    }

    async function handleCopyToClipboard() {
        if (!template?.component) return;

        setCopyStatus("loading");

        await navigator.clipboard.writeText(template.component);

        toast({
            title: writeLang([
                ["en", "Template copied successfully!"],
                ["pt", "Modelo copiado com sucesso!"],
            ]) as string,
        });

        setCopyStatus("initial");
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
                <div className="flex space-x-4">
                    <Input
                        defaultValue={template.component}
                        className="text-muted-foreground"
                        disabled={!template.component}
                    />
                    <SubmitButton
                        className="border-input bg-muted/50 hover:bg-muted text-accent-foreground"
                        label={
                            writeLang([
                                ["en", "Copy"],
                                ["pt", "Copiar"],
                            ]) as string
                        }
                        onSubmit={handleCopyToClipboard}
                        state={copyStatus}
                        disabled={!template.component}
                    />
                </div>
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
