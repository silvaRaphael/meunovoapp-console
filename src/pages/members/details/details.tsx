import { useEffect, useState } from "react";
import { Topbar } from "../../../components/top-bar";
import { Member } from "../../../adapters/member";
import { useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/section-header";
import { Separator } from "../../../components/ui/separator";
import { MemberForm } from "./details-form";
import { Button } from "../../../components/ui/button";
import { Page } from "../../../components/page";

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
        <Page
            pathname="/members"
            header={
                <SectionHeader
                    title="Members"
                    pathname="/members"
                    tree={
                        !!member
                            ? [{ label: `${member.name} ${member.lastName}` }]
                            : []
                    }
                >
                    <Button>Remove</Button>
                </SectionHeader>
            }
        >
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Edit Member</h3>
                    <p className="text-sm text-muted-foreground">
                        Some of this informations are public for other users
                    </p>
                </div>
                <Separator />
                <MemberForm member={member} />
            </div>
        </Page>
    );
}
