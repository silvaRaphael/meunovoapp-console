import { SectionHeader } from "components/shared/section-header";
import { useLanguage } from "components/shared/language-provider";
import { Page } from "components/shared/page";
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
                    title={
                        writeLang([
                            ["en", "Preferences"],
                            ["pt", "Preferências"],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/preferences"],
                            ["pt", "/preferencias"],
                        ]) as string
                    }
                ></SectionHeader>
            }
        >
            <PreferencesForm />
        </Page>
    );
}
