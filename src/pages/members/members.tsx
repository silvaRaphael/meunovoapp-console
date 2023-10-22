import { useEffect, useState } from "react";
import { Member, memberColumns } from "../../adapters/member";
import { DataTable } from "../../components/ui/data-table/data-table";
import { SectionHeader } from "../../components/section-header";
import { Search } from "../../components/search";
import { Page } from "../../components/page";
import { Button } from "../../components/ui/button";
import { SubmitButton } from "../../components/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../components/confirmation-alert";

interface MemberRow extends Member {
    deleteAction?: (props: any) => any;
}

export function Members() {
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
                confirmButton={
                    <SubmitButton
                        label="Delete"
                        onSubmit={async () => {
                            await new Promise((resolve, rejects) => {
                                setTimeout(() => {
                                    resolve(1);
                                    // rejects("An error occured!");
                                }, 1000);
                            });
                        }}
                        onError={(error: any) => {
                            toast({
                                variant: "destructive",
                                title: error || "An error occured!",
                            });
                        }}
                        onSuccess={() => {
                            toast({
                                title: "Member removed successfully!",
                            });
                            setOpenDelete(false);
                        }}
                    />
                }
            />
        </Page>
    );
}
