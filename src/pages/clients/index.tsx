import { useEffect, useState } from "react";
import { DataTable } from "../../components/ui/data-table/data-table";
import { SectionHeader } from "../../components/shared/section-header";
import { Page } from "../../components/shared/page";
import { Client } from "./data/client";
import { clientColumns } from "./data/columns";
import { HandleRequest } from "../../lib/handle-request";
import { useLanguage } from "../../components/shared/language-provider";
import { CreateClientForm } from "./forms/create";
import { errorToast } from "components/shared/error-toast";
import { InviteManagerForm } from "./forms/invite-manager";
import { useNavigate } from "react-router-dom";

export interface ClientRow extends Client {
  inviteAction?: (props: Client) => any;
}

export function Clients() {
  const { language, writeLang } = useLanguage();
  const navigate = useNavigate();

  const [clients, setClients] = useState<ClientRow[]>([]);
  const [client, setClient] = useState<Client | null>(null);

  async function getClients() {
    const request = await new HandleRequest().get(`/clients`, { language });

    request.onDone((response) => {
      setClients(
        (response as any).map(
          (item: Client): ClientRow => ({
            ...item,
            inviteAction(item) {
              setClient(item);
            },
          }),
        ),
      );
    });

    request.onError((error) => {
      errorToast(error);
      if (error.redirect) navigate(error.redirect);
    });
  }

  useEffect(() => {
    const controller = new AbortController();

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
          ["en", "/clients"],
          ["pt", "/clientes"],
        ]) as string
      }
      header={
        <SectionHeader
          title={
            writeLang([
              ["en", `Clients (${clients.length})`],
              ["pt", `Clientes (${clients.length})`],
            ]) as string
          }
        >
          <CreateClientForm onCreated={getClients} />
        </SectionHeader>
      }
    >
      <DataTable columns={clientColumns(writeLang)} data={clients} />
      <InviteManagerForm client={client} setClient={setClient} />
    </Page>
  );
}
