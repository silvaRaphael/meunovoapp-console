import { SectionHeader } from "../../components/section-header";
import { Separator } from "../../components/ui/separator";
import { Page } from "../../components/page";
import { user } from "../../config/user";
import { PreferencesForm } from "./form";

export function Preferences() {
    return (
        <Page pathname="/preferences" header={<SectionHeader title="Preferences" pathname="/preferences"></SectionHeader>}>
            <div className="space-y-6 pb-40">
                <div>
                    <h3 className="text-lg font-medium">Edit your Preferences</h3>
                    <p className="text-sm text-muted-foreground">This is your preferences for the app</p>
                </div>
                <Separator />
                <PreferencesForm user={user} />
            </div>
        </Page>
    );
}
