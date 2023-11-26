import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { Button, buttonVariants } from "../../../components/ui/button";
import { Page } from "../../../components/shared/page";
import { ConfirmationAlert } from "../../../components/shared/confirmation-alert";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/shared/language-provider";
import { SectionDetails } from "components/shared/section-details";
import { Email } from "../data/email";
import { useAuth } from "components/shared/auth-provider";
import { BASE_API } from "config/constants";
import { EmailSearch } from "../forms/search-form";

export function EmailDetails() {
    const { writeLang } = useLanguage();
    const { auth } = useAuth();

    const { id } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState<Email>();

    async function getEmail(id?: string) {
        try {
            const response = await fetch(`${BASE_API}/emails/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.token}`,
                },
            });

            if (!response.ok) {
                throw (await response.json()).error;
            }

            const email = await response.json();

            setEmail(email);
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

    useEffect(() => {
        const controller = new AbortController();

        getEmail(id);

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!email) return <></>;

    return (
        <Page
            pathname="/emails"
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", "Emails"],
                            ["pt", "Projetos"],
                        ]) as string
                    }
                    pathname="/emails"
                    tree={Array.isArray(email.to) ? email.to.map((to) => ({ label: to })) : [{ label: email.to }]}
                >
                    <ConfirmationAlert
                        triggerButton={
                            <Button>
                                {writeLang([
                                    ["en", "Remove"],
                                    ["pt", "Remover"],
                                ])}
                            </Button>
                        }
                        title={
                            writeLang([
                                ["en", "Are you sure you want to delete this email?"],
                                ["pt", "Você tem certeza que deseja excluir este projeto?"],
                            ]) as string
                        }
                        description={
                            writeLang([
                                ["en", "This action cannot be undone. This will permanently delete this data."],
                                ["pt", "Esta ação não pode ser desfeita. Isto excluirá permanentemente estes dados."],
                            ]) as string
                        }
                        confirmButton={
                            <SubmitButton
                                label={
                                    writeLang([
                                        ["en", "Delete"],
                                        ["pt", "Excluir"],
                                    ]) as string
                                }
                                className={buttonVariants({ variant: "destructive" })}
                                onSubmit={async () => {
                                    const { onDone, onError } = await new HandleRequest().delete("https://jsonplaceholder.typicode.com/users");
                                    onDone(() => {
                                        toast({
                                            variant: "success",
                                            title: "Email removed successfully!",
                                        });
                                        navigate("/emails");
                                    });
                                    onError(() =>
                                        toast({
                                            variant: "destructive",
                                            title: "An error occured!",
                                        }),
                                    );
                                }}
                            />
                        }
                    />
                </SectionHeader>
            }
        >
            <div className="space-y-6 pb-40">
                <SectionDetails
                    title={writeLang([
                        ["en", "Edit Email"],
                        ["pt", "Editar Projeto"],
                    ])}
                    subtitle={writeLang([
                        ["en", "Some of this informations are public for other users"],
                        ["pt", "Algumas informações são públicas para outros usuários"],
                    ])}
                />
                <EmailSearch email={email} />
            </div>
        </Page>
    );
}
