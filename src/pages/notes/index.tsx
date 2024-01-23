import { useEffect, useState } from "react";
import { SectionHeader } from "components/shared/section-header";
import { Page } from "components/shared/page";
import { useLanguage } from "components/shared/language-provider";
import { HandleRequest } from "lib/handle-request";
import { errorToast } from "components/shared/error-toast";
import { Note } from "./data/note";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import { Badge } from "components/ui/badge";
import { CreateNoteForm } from "./forms/create";
import { ConfirmationAlert } from "components/shared/confirmation-alert";
import { Button, buttonVariants } from "components/ui/button";
import { Trash2 } from "lucide-react";
import { SubmitButton } from "components/shared/submit-button";

export function Notes() {
  const { language, writeLang } = useLanguage();

  const [notes, setNotes] = useState<Note[]>([]);
  const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);

  async function getNotes() {
    const request = await new HandleRequest().get(`/notes`, { language });

    request.onDone((response) => {
      setNotes(response);
    });

    request.onError((error) => {
      errorToast(error);
    });
  }

  async function handleDelete(id: string) {
    const request = await new HandleRequest().delete(`/notes/${id}`, { language });

    request.onDone(() => {
      setNotes(notes.filter((item) => item.id !== id));
      setDeleteIsOpen(false);
    });

    request.onError((error) => {
      errorToast(error);
    });
  }

  useEffect(() => {
    const controller = new AbortController();

    getNotes();

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page
      pathname={
        writeLang([
          ["en", "/notes"],
          ["pt", "/notas"],
        ]) as string
      }
      header={
        <SectionHeader
          title={
            writeLang([
              ["en", `Notes (${notes.length})`],
              ["pt", `Notas (${notes.length})`],
            ]) as string
          }
        >
          <CreateNoteForm onCreated={getNotes} />
        </SectionHeader>
      }
    >
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-10">
        {notes.map((item, i) => (
          <Card key={i} className="h-min">
            <CardHeader>
              <CardTitle className="flex justify-between">
                {item.title}
                <ConfirmationAlert
                  title={
                    writeLang([
                      ["en", "Delete this Note"],
                      ["pt", "Excluir esta Nota"],
                    ]) as string
                  }
                  description={
                    writeLang([
                      ["en", "This action cannot be undone!"],
                      ["pt", "Esta ação não poderá ser desfeita!"],
                    ]) as string
                  }
                  triggerButton={
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Trash2 size={14} />
                    </Button>
                  }
                  confirmButton={
                    <SubmitButton
                      type="button"
                      onSubmit={() => handleDelete(item.id)}
                      className={buttonVariants({ variant: "destructive" })}
                      label={
                        writeLang([
                          ["en", "Delete Note"],
                          ["pt", "Excluir Nota"],
                        ]) as string
                      }
                    />
                  }
                  open={deleteIsOpen}
                  onOpenChange={setDeleteIsOpen}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-start space-y-4">
              <CardDescription>{item.content}</CardDescription>
              <CardFooter className="gap-2 p-0">
                {item.markers.map((item, i) => (
                  <Badge key={i} variant={i === 0 ? "default" : "outline"} className="pointer-events-none">
                    {item}
                  </Badge>
                ))}
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
    </Page>
  );
}
