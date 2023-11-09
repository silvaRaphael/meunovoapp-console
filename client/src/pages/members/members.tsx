import { useEffect, useState } from "react";
import { DataTable } from "../../components/ui/data-table/data-table";
import { SectionHeader } from "../../components/section-header";
import { Search } from "../../components/search";
import { Page } from "../../components/page";
import { Button, buttonVariants } from "../../components/ui/button";
import { SubmitButton } from "../../components/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../components/confirmation-alert";
import { Member } from "./data/member";
import { memberColumns } from "./data/columns";
import { HandleRequest } from "../../lib/handle-request";
import { useLanguage } from "../../components/language-provider";

interface MemberRow extends Member {
    deleteAction?: (props: Member) => any;
}

export function Members() {
    const { writeLang } = useLanguage();

    const [members, setMembers] = useState<MemberRow[]>([]);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    function getMembers() {
        fetch("/api/members.json")
            .then((res) => res.json())
            .then((res) => {
                res = res.map((item: Member): MemberRow => {
                    return {
                        ...item,
                        deleteAction() {
                            setOpenDelete(true);
                        },
                    };
                });
                setMembers(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getMembers();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Page
            pathname="/members"
            header={
                <SectionHeader title={`Members (${members.length})`} pathname="/members">
                    <Search />
                    <Button>Create</Button>
                </SectionHeader>
            }
        >
            <DataTable columns={memberColumns} data={members} />
            <ConfirmationAlert
                open={openDelete}
                onOpenChange={setOpenDelete}
                title="Are you sure you want to delete this member?"
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
                                    title: "Member removed successfully!",
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
