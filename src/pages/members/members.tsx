import { useEffect, useState } from "react";
import { Topbar } from "../../components/topbar";
import { Member, memberColumns } from "../../adapters/member";
import { DataTable } from "../../components/ui/data-table";
import { SectionHeader } from "../../components/section-header";
import { Search } from "../../components/search";
import { AddButton } from "../../components/buttons";

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
        <div>
            <Topbar pathname="/members" />
            <SectionHeader
                title={`Members (${members.length})`}
                pathname="/members"
            >
                <Search />
                <AddButton />
            </SectionHeader>
            <div className="bg-background">
                <div className="p-6">
                    <DataTable columns={memberColumns} data={members} />
                </div>
            </div>
        </div>
    );
}
