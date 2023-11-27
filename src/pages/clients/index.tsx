import { useEffect, useState } from "react";
import { DataTable } from "../../components/ui/data-table/data-table";
import { SectionHeader } from "../../components/shared/section-header";
import { Search } from "../../components/shared/search";
import { Page } from "../../components/shared/page";
import { Button, buttonVariants } from "../../components/ui/button";
import { SubmitButton } from "../../components/shared/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../components/shared/confirmation-alert";
import { Client } from "./data/client";
import { clientColumns } from "./data/columns";
import { HandleRequest } from "../../lib/handle-request";
import { useLanguage } from "../../components/shared/language-provider";

interface ClientRow extends Client {
    deleteAction?: (props: Client) => any;
}

export function Clients() {
    const { writeLang } = useLanguage();

    const [clients, setClients] = useState<ClientRow[]>([]);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    function getClients() {
        fetch("/api/clients.json")
            .then((res) => res.json())
            .then((res) => {
                res = res.map((item: Client): ClientRow => {
                    return {
                        ...item,
                        deleteAction() {
                            setOpenDelete(true);
                        },
                    };
                });
                setClients(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getClients();

        return () => {
            controller.abort();
        };
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
                    title={`Clients (${clients.length})`}
                    pathname={
                        writeLang([
                            ["en", "/clients"],
                            ["pt", "/clientes"],
                        ]) as string
                    }
                >
                    <Search />
                    <Button>Create</Button>
                </SectionHeader>
            }
        >
            <DataTable columns={clientColumns(writeLang)} data={clients} />
            <ConfirmationAlert
                open={openDelete}
                onOpenChange={setOpenDelete}
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
        </Page>
    );
}
