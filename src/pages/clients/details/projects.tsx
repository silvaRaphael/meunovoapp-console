import { useEffect, useState } from "react";
import { DataTable } from "../../../components/ui/data-table/data-table";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../../components/shared/confirmation-alert";
import { ContentAlert } from "../../../components/shared/content-alert";
import { Actions } from "../../../components/shared/actions";
import { Project } from "../../projects/data/project";
import { projectColumns } from "../../projects/data/columns";
import { Client } from "../data/client";
import { useLanguage } from "../../../components/shared/language-provider";
import { buttonVariants } from "../../../components/ui/button";

export interface ProjectRow extends Project {
    seeTeams?: (props: Project) => any;
}

export function ClientProjects({ client }: { client: Client }) {
    return <></>;
    // const { writeLang } = useLanguage();

    // const [projects, setProjects] = useState<ProjectRow[]>([]);
    // const [openDelete, setOpenDelete] = useState<boolean>(false);
    // const [projectName, setProjectName] = useState<string>("");

    // function getProjects(client: Client) {
    //     fetch("/api/projects.json")
    //         .then((res) => res.json())
    //         .then((res) => {
    //             res = res.map((item: Project): ProjectRow => {
    //                 return {
    //                     ...item,
    //                     seeTeams(item) {
    //                         setProjectName(item.title);
    //                     },
    //                 };
    //             });
    //             setProjects(res);
    //         });
    // }

    // useEffect(() => {
    //     const controller = new AbortController();

    //     getProjects(client);

    //     return () => {
    //         controller.abort();
    //     };
    // }, [client]);

    // return (
    //     <>
    //         <DataTable columns={projectColumns} data={projects} />
    //         <ConfirmationAlert
    //             open={openDelete}
    //             onOpenChange={setOpenDelete}
    //             title="Are you sure you want to delete this project?"
    //             description={
    //                 writeLang([
    //                     ["en", "This action cannot be undone. This will permanently delete this data."],
    //                     ["pt", "Esta ação não pode ser desfeita. Isto excluirá permanentemente estes dados."],
    //                 ]) as string
    //             }
    //             confirmButton={
    //                 <SubmitButton
    //                     label={
    //                         writeLang([
    //                             ["en", "Delete"],
    //                             ["pt", "Excluir"],
    //                         ]) as string
    //                     }
    //                     className={buttonVariants({ variant: "destructive" })}
    //                     onSubmit={async () => {
    //                         await new Promise((resolve, rejects) => {
    //                             setTimeout(() => {
    //                                 resolve(1);
    //                                 // rejects("An error occured!");
    //                             }, 1000);
    //                         });
    //                     }}
    //                     onError={(error: any) => {
    //                         toast({
    //                             variant: "destructive",
    //                             title: error || "An error occured!",
    //                         });
    //                     }}
    //                     onSuccess={() => {
    //                         toast({
    //                             title: "Project removed successfully!",
    //                         });
    //                         setOpenDelete(false);
    //                     }}
    //                 />
    //             }
    //         />
    //     </>
    // );
}
