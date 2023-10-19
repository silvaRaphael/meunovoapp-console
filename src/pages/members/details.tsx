import { useEffect, useState } from "react";
import { Topbar } from "../../components/top-bar";
import { Member } from "../../adapters/member";
import { useParams } from "react-router-dom";
import { SectionHeader } from "../../components/section-header";
import { DeleteButton } from "../../components/buttons";
import { Separator } from "../../components/ui/separator";
import { MemberForm } from "./details-form";

export function MemberDetails() {
    const { username } = useParams();

    const [member, setMember] = useState<Member>();

    function getMember(username?: string) {
        fetch("/api/members.json")
            .then((res) => res.json())
            .then((res) => {
                setMember(
                    res.find(
                        (res: any) =>
                            res.username === username?.replace("@", ""),
                    ) || null,
                );
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getMember(username);

        return () => {
            controller.abort();
        };
    });

    if (!member) return <></>;

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
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium">Edit Member</h3>
                            <p className="text-sm text-muted-foreground">
                                Some of this informations are public for other
                                users
                            </p>
                        </div>
                        <Separator />
                        <MemberForm member={member} />
                    </div>
                </div>
            </div>
        </div>
    );
}
