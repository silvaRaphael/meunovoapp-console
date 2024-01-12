import { SectionHeader } from "../../components/shared/section-header";
import { Page } from "../../components/shared/page";
import { useLanguage } from "../../components/shared/language-provider";
import { DataTable } from "components/ui/data-table/data-table";
import { templateColumns } from "./data/column";
import { templates } from "./data/data";

export function Templates() {
    const { writeLang } = useLanguage();

    return (
        <Page
            pathname={
                writeLang([
                    ["en", "/templates"],
                    ["pt", "/modelos"],
                ]) as string
            }
            header={
                <SectionHeader
                    title={
                        writeLang([
                            ["en", `Templates (${templates.length})`],
                            ["pt", `Modelos (${templates.length})`],
                        ]) as string
                    }
                    pathname={
                        writeLang([
                            ["en", "/templates"],
                            ["pt", "/modelos"],
                        ]) as string
                    }
                ></SectionHeader>
            }
        >
            <DataTable columns={templateColumns(writeLang)} data={templates} />
        </Page>
    );
}
