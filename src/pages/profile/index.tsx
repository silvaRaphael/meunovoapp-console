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
            <ProfileForm user={user} />
        </Page>
    );
}
