import { SectionHeader } from "components/shared/section-header";
import { useLanguage } from "components/shared/language-provider";
import { Separator } from "components/ui/separator";
import { Page } from "components/shared/page";
import { user } from "config/user";
import { PreferencesForm } from "./form";

export function Preferences() {
    const { writeLang } = useLanguage();

    return (
        <Page
            pathname={
                writeLang([
                    ["en", "/preferences"],
                    ["pt", "/preferencias"],
                ]) as string
            }
            header={
                <SectionHeader
                    title="Preferences"
                    pathname={
                        writeLang([
                            ["en", "/preferences"],
                            ["pt", "/preferencias"],
                        ]) as string
                    }
                ></SectionHeader>
            }
        >
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
