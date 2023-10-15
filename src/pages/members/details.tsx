import { useEffect, useState } from "react";
import { Topbar } from "../../components/topbar";
import { Member } from "../../adapters/member";
import { useParams } from "react-router-dom";
import { SectionHeader } from "../../components/section-header";
import { DeleteButton } from "../../components/buttons";

export function MemberDetails() {
    const { id } = useParams();

    const [member, setMember] = useState<Member | null>(null);

    function getMember(id?: string) {
        fetch("/api/members.json")
            .then((res) => res.json())
            .then((res) => {
                setMember(res.find((res: any) => res.id === id) || null);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getMember(id);

        return () => {
            controller.abort();
        };
    }, [id]);

    return (
        <div>
            <Topbar pathname="/members" />
            <SectionHeader
                title="Members"
                pathname="/members"
                tree={
                    !!member
                        ? [{ label: `${member.name} ${member.lastName}` }]
                        : []
                }
            >
                <DeleteButton />
            </SectionHeader>
            <div className="bg-background">
                <div className="p-6">
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
                </div>
            </div>
        </div>
    );
}
