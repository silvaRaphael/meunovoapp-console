import { useEffect, useState } from "react";
import { Topbar } from "../components/topbar";
import { Member, memberColumns } from "../adapters/member";
import { DataTable } from "../components/ui/data-table";
import { useParams } from "react-router-dom";

export function Members() {
    const { id } = useParams();

    console.log(id);

    const [loading, setLoading] = useState<boolean>(!!id);
    const [members, setMembers] = useState<Member[]>([]);
    const [member, setMember] = useState<Member | null>(null);

    function getMembers(id?: string) {
        fetch("/api/members.json")
            .then((res) => res.json())
            .then((res) => {
                setMembers(res);
                getMember(res, id);
            });
    }

    function getMember(members: Member[], id?: string) {
        setMember(members.find((member) => member.id === id) || null);
        setLoading(false);
    }

    useEffect(() => {
        const controller = new AbortController();

        getMembers(id);

        console.log("effect");

        return () => {
            controller.abort();
        };
    }, [id]);

    console.log(member);

    if (loading) return <div></div>;

    return (
        <div>
            <Topbar
                title="Members"
                pathname="/members"
                tree={
                    !!member
                        ? [{ label: `${member.name} ${member.lastName}` }]
                        : []
                }
            />
            <div className="bg-background">
                <div className="p-6">
                    {member ? (
                        <div className="">
                            <div className="grid grid-cols-4">
                                <div className="flex flex-col">
                                    {Array.from(new Array(8)).map((_, i) => (
                                        <span key={i}>Item</span>
                                    ))}
                                </div>
                                <div className="col-span-3"></div>
                            </div>
                        </div>
                    ) : (
                        <DataTable columns={memberColumns} data={members} />
                    )}
                </div>
            </div>
        </div>
    );
}
