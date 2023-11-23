import { useLanguage } from "components/shared/language-provider";
import { Email } from "./data/email";
import { useEffect, useState } from "react";
import { Page } from "components/shared/page";
import { SectionHeader } from "components/shared/section-header";
import { Search } from "components/shared/search";
import { DataTable } from "components/ui/data-table/data-table";
import { emailsColumns } from "./data/columns";
import { BASE_API } from "config/constants";
import { useAuth } from "components/shared/auth-provider";

export function Emails() {
    const { writeLang } = useLanguage();
    const { auth } = useAuth();

    const [emails, setEmails] = useState<Email[]>([]);

    function getEmails() {
        fetch(`${BASE_API}/emails`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setEmails(res.emails);
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
                    title={`Emails (${emails.length})`}
                    pathname={
                        writeLang([
                            ["en", "/email"],
                            ["pt", "/email"],
                        ]) as string
                    }
                >
                    <Search />
                </SectionHeader>
            }
        >
            <DataTable columns={emailsColumns} data={emails} />
        </Page>
    );
}
