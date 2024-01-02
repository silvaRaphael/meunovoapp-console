import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { Page } from "../../../components/shared/page";
import { Client } from "../data/client";
import { Tabs, TabsContent, TabsList, TabsTrigger, changeTab } from "../../../components/ui/tabs";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/shared/language-provider";
import { errorToast } from "components/shared/error-toast";
import { ClientForm } from "./form";
import { ClientUsers } from "./users";
import { InviteUserForm } from "../forms/invite-user";
import { ClientProjects } from "./projects";
import { CreateProjectForm } from "pages/projects/forms/create";

export function ClientDetails() {
    const { writeLang } = useLanguage();
    const { id } = useParams();

    const [client, setClient] = useState<Client>();
    const [inviteUserOpen, setInviteUserOpen] = useState<boolean>(false);
    const [tab, setTab] = useState<string>(new URL(window.location.href).searchParams.get("tab") ?? "0");

    async function getClient(id?: string) {
        const request = await new HandleRequest().get(`/clients/${id}`);

        request.onDone((response) => {
            setClient(response);
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getClient(id);

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!client) return <></>;

    return (
        <Page
            pathname={
                writeLang([
                    ["en", "/clients"],
                    ["pt", "/clientes"],
                ]) as string
            }
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", "Clients"],
                            ["pt", "Clientes"],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/clients"],
                            ["pt", "/clientes"],
                        ]) as string
                    }
                    tree={!!client ? [{ label: client.company }] : []}
                >
                    {tab === "1" && (
                        <InviteUserForm
                            client={client}
                            setClient={setClient}
                            open={inviteUserOpen}
                            setOpen={setInviteUserOpen}
                        />
                    )}
                    {tab === "2" && (
                        <CreateProjectForm
                            label={
                                writeLang([
                                    ["en", "Create project"],
                                    ["pt", "Novo projeto"],
                                ]) as string
                            }
                            client_id={client.id}
                            onCreated={() => getClient(id)}
                        />
                    )}
                </SectionHeader>
            }
        >
            <div className="space-y-6 pb-40">
                <Tabs defaultValue="0" className="w-full" value={tab} onValueChange={(tab) => changeTab(tab, setTab)}>
                    <TabsList className="w-min flex mx-auto">
                        <TabsTrigger value="0" className="w-auto sm:w-36">
                            {writeLang([
                                ["en", "Client"],
                                ["pt", "Cliente"],
                            ])}
                        </TabsTrigger>
                        <TabsTrigger value="1" className="w-auto sm:w-36">
                            {writeLang([
                                ["en", "Users"],
                                ["pt", "Usuários"],
                            ])}
                        </TabsTrigger>
                        <TabsTrigger value="2" className="w-auto sm:w-36">
                            {writeLang([
                                ["en", "Projects"],
                                ["pt", "Projetos"],
                            ])}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="0" className="pt-3">
                        <ClientForm client={client} />
                    </TabsContent>
                    <TabsContent value="1" className="pt-3">
                        <ClientUsers client={client} />
                    </TabsContent>
                    <TabsContent value="2" className="pt-3">
                        <ClientProjects client={client} />
                    </TabsContent>
                </Tabs>
            </div>
        </Page>
    );
}
