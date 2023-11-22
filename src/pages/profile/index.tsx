import { useLanguage } from "components/shared/language-provider";
import { SectionHeader } from "components/shared/section-header";
import { Separator } from "components/ui/separator";
import { Page } from "components/shared/page";
import { user } from "config/user";
import { ProfileForm } from "./form";

export function Profile() {
    const { writeLang } = useLanguage();

    return (
        <Page
            pathname={
                writeLang([
                    ["en", "/profile"],
                    ["pt", "/perfil"],
                ]) as string
            }
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", "Profile"],
                            ["pt", "Perfil"],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/profile"],
                            ["pt", "/perfil"],
                        ]) as string
                    }
                ></SectionHeader>
            }
        >
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
