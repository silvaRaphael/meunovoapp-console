import { DataTable } from "../../../components/ui/data-table/data-table";
import { Task } from "../../tasks/data/task";
import { Client } from "../data/client";
import { useLanguage } from "../../../components/shared/language-provider";
import { userColumns } from "../data/user-columns";

export interface TaskRow extends Task {
    seeTeams?: (props: Task) => any;
}

export function ClientUsers({ client }: { client: Client }) {
    const { writeLang } = useLanguage();

    return (
        <>
            <DataTable columns={userColumns(writeLang)} data={client.users || []} />
        </>
    );
}
