import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "lib/axios";
import { SectionHeader } from "components/shared/section-header";
import { Page } from "components/shared/page";
import { useLanguage } from "components/shared/language-provider";
import { Note } from "./data/note";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import { Badge } from "components/ui/badge";
import { CreateNoteForm } from "./forms/create";
import { ConfirmationAlert } from "components/shared/confirmation-alert";
import { Button, buttonVariants } from "components/ui/button";
import { Ban, Loader, Trash2 } from "lucide-react";
import { SubmitButton } from "components/shared/submit-button";
import { Alert, AlertDescription } from "components/ui/alert";
import { queryClient } from "components/shared/query";

export function Notes() {
  const { language, writeLang } = useLanguage();

  const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);

  const getNotes = async (): Promise<Note[]> =>
    (await api.get("/notes", { headers: { "Content-Language": language.locale } })).data;

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  const deleteNote = async (id: string) => {
    return await api.delete(`/notes/${id}`, { headers: { "Content-Language": language.locale } });
  };

  const { mutate: deleteNoteFn } = useMutation({
    mutationKey: ["notes"],
    mutationFn: deleteNote,
    onSuccess(_, variables) {
      queryClient.setQueryData(["notes"], (items: Note[]) => items.filter((item) => item.id !== variables));
      setDeleteIsOpen(false);
    },
  });

  function handleDelete(id: string) {
    deleteNoteFn(id);
  }

  const Loading = () => (
    <div className="flex w-full h-[500px] justify-center items-center">
      <Loader size={16} className="animate-spin" />
    </div>
  );

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
              ["en", `Notes (${notes?.length ?? 0})`],
              ["pt", `Notas (${notes?.length ?? 0})`],
            ]) as string
          }
        >
          <CreateNoteForm />
        </SectionHeader>
      }
    >
      {isLoading ? (
        <Loading />
      ) : !notes?.length ? (
        <Alert>
          <Ban className="h-4 w-4" />
          <AlertDescription className="mt-[.35rem]">
            {writeLang([
              ["en", "No notes yet!"],
              ["pt", "Nenhuma nota ainda!"],
            ])}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-10">
          {notes?.map((item, i) => (
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
                        onSubmit={async () => handleDelete(item.id)}
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
      )}
    </Page>
  );
}
