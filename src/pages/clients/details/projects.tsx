import { DataTable } from "../../../components/ui/data-table/data-table";
import { projectColumns } from "../../projects/data/columns";
import { Client } from "../data/client";
import { useLanguage } from "../../../components/shared/language-provider";

export function ClientProjects({ client }: { client: Client }) {
    const { language, writeLang } = useLanguage();

    return <DataTable columns={projectColumns(language, writeLang).filter((column) => column.id !== "client")} data={client.projects ?? []} />;
}
