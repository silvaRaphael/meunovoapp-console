import { useEffect, useState } from "react";
import { DataTable } from "components/ui/data-table/data-table";
import { SectionHeader } from "components/shared/section-header";
import { Page } from "components/shared/page";
import { useLanguage } from "components/shared/language-provider";
import { HandleRequest } from "lib/handle-request";
import { Project } from "./data/project";
import { projectColumns } from "./data/columns";
import { errorToast } from "components/shared/error-toast";
import { BASE_API } from "config/constants";
import { useAuth } from "components/shared/auth-provider";
import { CreateProjectForm } from "./forms/create";
import { Client } from "pages/clients/data/client";
import { HandlePermission } from "lib/handle-permission";

export function Projects() {
    const { auth } = useAuth();
    const { language, writeLang } = useLanguage();

    const [projects, setProjects] = useState<Project[]>([]);
    const [clients, setClients] = useState<Client[]>([]);

    async function getProjects() {
        const request = await new HandleRequest().get(`${BASE_API}/projects`, {
            token: auth?.token,
        });

        request.onDone((response) => {
            setProjects(response);
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    async function getClients() {
        const request = await new HandleRequest().get(`${BASE_API}/clients`, {
            token: auth?.token,
        });

        request.onDone((response) => {
            setClients(response);
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getProjects();
        getClients();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Page
            pathname={
                writeLang([
                    ["en", "/projects"],
                    ["pt", "/projetos"],
                ]) as string
            }
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", `Projects (${projects.length})`],
                            ["pt", `Projetos (${projects.length})`],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/projects"],
                            ["pt", "/projetos"],
                        ]) as string
                    }
                >
                    {HandlePermission(<CreateProjectForm clients={clients} onCreated={getProjects} />)}
                </SectionHeader>
            }
        >
            <DataTable columns={projectColumns(language, writeLang)} data={projects} />
        </Page>
    );
}
