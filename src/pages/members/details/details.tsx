import { useEffect, useState } from "react";
import { Member } from "../../../adapters/member";
import { useNavigate, useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/section-header";
import { Separator } from "../../../components/ui/separator";
import { MemberForm } from "./details-form";
import { Button } from "../../../components/ui/button";
import { Page } from "../../../components/page";
import { ConfirmationAlert } from "../../../components/confirmation-alert";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";

export function MemberDetails() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState<Member>();

    function getMember(username?: string) {
        fetch("/api/members.json")
            .then((res) => res.json())
            .then((res) => {
                setMember(res.find((res: any) => res.username === username?.replace("@", "")) || null);
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
                <SectionHeader title="Members" pathname="/members" tree={!!member ? [{ label: `${member.name} ${member.lastName}` }] : []}>
                    <ConfirmationAlert
                        triggerButton={<Button>Remove</Button>}
                        title="Are you sure you want to delete this member?"
                        description="This action cannot be undone. This will permanently delete this data."
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
                                    navigate("/members", {
                                        state: {
                                            toast: {
                                                title: "Member removed successfully!",
                                            },
                                        },
                                    });
                                }}
                            />
                        }
                    />
                </SectionHeader>
            }
        >
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Edit Member</h3>
                    <p className="text-sm text-muted-foreground">Some of this informations are public for other users</p>
                </div>
                <Separator />
                <MemberForm member={member} />
            </div>
        </Page>
    );
}
