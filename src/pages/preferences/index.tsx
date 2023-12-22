import { SectionHeader } from "components/shared/section-header";
import { useLanguage } from "components/shared/language-provider";
import { Page } from "components/shared/page";
import { PreferencesForm } from "./form";
import { useEffect, useState } from "react";
import { useAuth } from "components/shared/auth-provider";
import { PreferencesSchema } from "adapters/preferences";
import { HandleRequest } from "lib/handle-request";
import { BASE_API } from "config/constants";
import { errorToast } from "components/shared/error-toast";

export function Preferences() {
    const { auth } = useAuth();
    const { writeLang } = useLanguage();

    const [preferences, setPreferences] = useState<PreferencesSchema>();

    async function getPreferences() {
        const request = await new HandleRequest().get(`${BASE_API}/preferences`, {
            token: auth?.token,
        });

        request.onDone((response) => {
            setPreferences(response);
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getPreferences();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!preferences) return <></>;

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
            <PreferencesForm preferences={preferences} />
        </Page>
    );
}
