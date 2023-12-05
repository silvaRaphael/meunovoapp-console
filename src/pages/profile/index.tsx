import { useLanguage } from "components/shared/language-provider";
import { SectionHeader } from "components/shared/section-header";
import { Page } from "components/shared/page";
import { ProfileForm } from "./form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { ClientForm } from "pages/clients/details/form";
import { useEffect, useState } from "react";
import { useAuth } from "components/shared/auth-provider";
import { HandleRequest } from "lib/handle-request";
import { BASE_API } from "config/constants";
import { errorToast } from "components/shared/error-toast";
import { User } from "config/user";

export function Profile() {
    const { auth } = useAuth();
    const { writeLang } = useLanguage();

    const [profile, setProfile] = useState<User>();

    async function getProfile() {
        const request = await new HandleRequest().get(`${BASE_API}/users/profile`, {
            token: auth?.token,
        });

        request.onDone((response) => {
            setProfile(response);
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getProfile();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!profile) return <></>;

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
                <Tabs defaultValue="profile" className="w-full">
                    {profile.client && (
                        <TabsList className="w-min flex mx-auto">
                            <TabsTrigger value="profile" className="w-auto sm:w-36">
                                {writeLang([
                                    ["en", "Profile"],
                                    ["pt", "Perfil"],
                                ])}
                            </TabsTrigger>
                            <TabsTrigger value="client" className="w-auto sm:w-36">
                                {writeLang([
                                    ["en", "Client"],
                                    ["pt", "Cliente"],
                                ])}
                            </TabsTrigger>
                        </TabsList>
                    )}
                    <TabsContent value="profile" className="pt-3">
                        <ProfileForm user={profile} />
                    </TabsContent>
                    {profile.client && (
                        <TabsContent value="client" className="pt-3">
                            <ClientForm client={profile.client} />
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        </Page>
    );
}
