import { useLanguage } from "components/shared/language-provider";
import { Email } from "./data/email";
import { useEffect, useState } from "react";
import { Page } from "components/shared/page";
import { SectionHeader } from "components/shared/section-header";
import { DataTable } from "components/ui/data-table/data-table";
import { emailsColumns } from "./data/columns";
import { BASE_API } from "config/constants";
import { useAuth } from "components/shared/auth-provider";
import { HandleRequest } from "lib/handle-request";
import { errorToast } from "components/shared/error-toast";

export function Emails() {
    const { writeLang } = useLanguage();
    const { auth } = useAuth();

    const [emails, setEmails] = useState<Email[]>([]);

    async function getEmails() {
        const request = await new HandleRequest().get(`${BASE_API}/emails`, {
            token: auth?.token,
        });

        request.onDone((response) => {
            setEmails(response as unknown as Email[]);
        });

        request.onError((error) => {
            errorToast(error);
        });
    }

    useEffect(() => {
        const controller = new AbortController();

        getEmails();

        return () => {
            controller.abort();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Page
            pathname={
                writeLang([
                    ["en", "/emails"],
                    ["pt", "/emails"],
                ]) as string
            }
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", `Emails (${emails.length})`],
                            ["pt", `E-mails (${emails.length})`],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/email"],
                            ["pt", "/email"],
                        ]) as string
                    }
                ></SectionHeader>
            }
        >
            <DataTable columns={emailsColumns(writeLang)} data={emails} />
        </Page>
    );
}
