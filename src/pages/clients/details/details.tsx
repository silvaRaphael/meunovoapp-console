import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { ClientForm } from "./form";
import { Button, buttonVariants } from "../../../components/ui/button";
import { Page } from "../../../components/shared/page";
import { ConfirmationAlert } from "../../../components/shared/confirmation-alert";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Client } from "../data/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/shared/language-provider";

export function ClientDetails() {
    const { writeLang } = useLanguage();

    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState<Client>();

    function getClient(id?: string) {}

    useEffect(() => {
        const controller = new AbortController();

        // getClient(id);

        return () => {
            controller.abort();
        };
    }, [id]);

    if (!client) return <></>;

    return (
        <Page
            pathname="/clients"
            header={
                <SectionHeader title="Clients" pathname="/clients" tree={!!client ? [{ label: client.company }] : []}>
                    <ConfirmationAlert
                        triggerButton={
                            <Button>
                                {writeLang([
                                    ["en", "Remove"],
                                    ["pt", "Remover"],
                                ])}
                            </Button>
                        }
                        title="Are you sure you want to delete this client?"
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
                                            title: "Client removed successfully!",
                                        });
                                        navigate("/clients");
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
                <Tabs defaultValue="client">
                    <TabsList>
                        <TabsTrigger value="client">Client</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                    </TabsList>
                    <TabsContent value="client" className="pt-3">
                        <ClientForm client={client} />
                    </TabsContent>
                    <TabsContent value="users" className="pt-3">
                        {/* <ClientTeams client={client} /> */}
                    </TabsContent>
                    <TabsContent value="projects" className="pt-3">
                        {/* <ClientProjects client={client} /> */}
                    </TabsContent>
                    <TabsContent value="tasks" className="pt-3">
                        {/* <ClientTasks client={client} /> */}
                    </TabsContent>
                </Tabs>
            </div>
        </Page>
    );
}
