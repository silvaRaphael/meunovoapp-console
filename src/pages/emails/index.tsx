import { useLanguage } from "components/shared/language-provider";
import { Email } from "./data/email";
import { useEffect, useState } from "react";
import { Page } from "components/shared/page";
import { SectionHeader } from "components/shared/section-header";
import { DataTable } from "components/ui/data-table/data-table";
import { emailsColumns } from "./data/columns";
import { HandleRequest } from "lib/handle-request";
import { errorToast } from "components/shared/error-toast";
import { useNavigate } from "react-router-dom";

export function Emails() {
    const { writeLang } = useLanguage();
    const navigate = useNavigate();

    const [emails, setEmails] = useState<Email[]>([]);

    async function getEmails() {
        const request = await new HandleRequest().get(`/emails`);

        request.onDone((response) => {
            setEmails(response as unknown as Email[]);
        });

        request.onError((error) => {
            errorToast(error);
            if (error.redirect) navigate(error.redirect);
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
