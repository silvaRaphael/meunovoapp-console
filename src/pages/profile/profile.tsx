import { SectionHeader } from "../../components/section-header";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { Page } from "../../components/page";
import { ConfirmationAlert } from "../../components/confirmation-alert";
import { SubmitButton } from "../../components/submit-button";
import { user } from "../../config/user";
import { ProfileFormVert } from "./form-vert";

export function Profile() {
    return (
        <Page pathname="/profile" header={<SectionHeader title="Profile" pathname="/profile"></SectionHeader>}>
            <div className="space-y-6 pb-40">
                <div>
                    <h3 className="text-lg font-medium">Edit your Profile</h3>
                    <p className="text-sm text-muted-foreground">Some of this informations are public for other users</p>
                </div>
                <Separator />
                <ProfileFormVert user={user} />
            </div>
        </Page>
    );
}
