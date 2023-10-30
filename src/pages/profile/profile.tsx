import { SectionHeader } from "../../components/section-header";
import { Separator } from "../../components/ui/separator";
import { Page } from "../../components/page";
import { user } from "../../config/user";
import { ProfileForm } from "./form";

export function Profile() {
    return (
        <Page pathname="/profile" header={<SectionHeader title="Profile" pathname="/profile"></SectionHeader>}>
            <div className="space-y-6 pb-40">
                <div>
                    <h3 className="text-lg font-medium">Edit your Profile</h3>
                    <p className="text-sm text-muted-foreground">Some of this informations are public for other users</p>
                </div>
                <Separator />
                <ProfileForm user={user} />
            </div>
        </Page>
    );
}
