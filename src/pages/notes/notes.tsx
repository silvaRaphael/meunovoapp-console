import { useEffect, useState } from "react";
import { SectionHeader } from "../../components/section-header";
import { Search } from "../../components/search";
import { Page } from "../../components/page";
import { SubmitButton } from "../../components/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { ConfirmationAlert } from "../../components/confirmation-alert";
import { Note } from "./data/note";
import { Mod } from "../../mod/handle-request";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { format } from "date-fns";
import { NoteForm } from "./details/form";
import { CreateNoteForm } from "./create/form";
import { Actions } from "../../components/actions";
import { CustomSheet } from "../../components/custom-sheet";

export function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [note, setNote] = useState<Note | null>(null);
    const [openDelete, setOpenDelete] = useState<Note | null>(null);

    function getNotes() {
        fetch("/api/notes.json")
            .then((res) => res.json())
            .then((res: Note[]) => {
                res = res.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setNotes(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getNotes();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Page
            pathname="/notes"
            header={
                <SectionHeader title={`Notes (${notes.length})`} pathname="/notes">
                    <Search />
                </SectionHeader>
            }
        >
            <div className="space-y-6 pb-40">
                <div
                    className="grid gap-4 grid-cols-3"
                    style={{
                        height: note ? `calc(100vh - 48px - 48px - 36px)` : "",
                    }}
                >
                    <CreateNoteForm setNotes={setNotes} setNote={setNote} notes={notes} />
                    {[
                        notes.map((item, i) => (
                            <Card key={i} className="flex flex-col justify-between select-none hover:bg-accent hover:text-accent-foreground group">
                                <div className="cursor-pointer" onClick={() => setNote(item)}>
                                    <CardHeader>
                                        <CardTitle className="text-3xl text-start">{item.title?.length > 30 ? `${item.title?.slice(0, 30)}...` : item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="font-medium text-neutral-950/80 dark:text-neutral-50/80">
                                            {item.description && item.description?.length > 100 ? `${item.description?.slice(0, 100)}...` : item.description}
                                        </CardDescription>
                                    </CardContent>
                                </div>
                                <CardFooter className="text-sm font-bold flex justify-between">
                                    {format(new Date(item.createdAt), "PPP")}
                                    <Actions.Delete className="invisible group-hover:visible hover:bg-background" onClick={() => setOpenDelete(item)} />
                                </CardFooter>
                            </Card>
                        )),
                    ]}
                </div>
                {!!note && (
                    <CustomSheet open={!!note} onOpenChange={() => setNote(note ? null : note)} title={note?.title} closeButton={false}>
                        <NoteForm note={note} setNote={setNote} />
                    </CustomSheet>
                )}
                <ConfirmationAlert
                    open={!!openDelete}
                    onOpenChange={() => setOpenDelete(note ? null : note)}
                    title="Are you sure you want to delete this note?"
                    description="This action cannot be undone. This will permanently delete this data."
                    confirmButton={
                        <SubmitButton
                            label="Delete"
                            onSubmit={async () => {
                                const { onDone, onError } = await new Mod().delete("https://jsonplaceholder.typicode.com/users");
                                onDone(() => {
                                    toast({
                                        variant: "success",
                                        title: "Note removed successfully!",
                                    });
                                });
                                onError(() =>
                                    toast({
                                        variant: "destructive",
                                        title: "An error occured!",
                                    }),
                                );
                            }}
                        />
                    }
                />
            </div>
        </Page>
    );
}
