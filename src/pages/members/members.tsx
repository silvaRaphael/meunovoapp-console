import { useEffect, useState } from "react";
import { Member, memberColumns } from "../../adapters/member";
import { DataTable } from "../../components/ui/data-table/data-table";
import { SectionHeader } from "../../components/section-header";
import { Search } from "../../components/search";
import { AddButton } from "../../components/buttons";
import { Page } from "../../components/page";

export function Members() {
    const [members, setMembers] = useState<Member[]>([]);

    function getMembers() {
        fetch("/api/members.json")
            .then((res) => res.json())
            .then((res) => {
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
                <SectionHeader
                    title={`Members (${members.length})`}
                    pathname="/members"
                >
                    <Search />
                    <AddButton />
                </SectionHeader>
            }
        >
            <DataTable columns={memberColumns} data={members} />
        </Page>
    );
}
