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

export function Notes() {
  const { language, writeLang } = useLanguage();

  const [notes, setNotes] = useState<Note[]>([]);

  async function getNotes() {
    const request = await new HandleRequest().get(`/notes`, { language });

    request.onDone((response) => {
      setNotes(response);
    });

    request.onError((error) => {
      errorToast(error);
    });
  }

  useEffect(() => {
    const controller = new AbortController();

    // getNotes();

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
        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
          <Card key={i} className="h-min">
            <CardHeader>
              <CardTitle>Note Title</CardTitle>
            </CardHeader>
            <CardContent className="text-start space-y-4">
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ad eveniet quam a, eligendi dolores
                reprehenderit saepe temporibus non cum odit dicta corrupti fugiat? Provident, quam.
                {i % 3 === 0
                  ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, qu olor sit amet consectetur adipisicing elit. Quam, qu olor sit amet consectetur adipisicing elit. Quam, quos."
                  : ""}
              </CardDescription>
              <CardFooter className="gap-2 p-0">
                {[1, 2, 0].map((item, i) => (
                  <Badge key={i} variant={i === 0 ? "default" : "outline"} className="pointer-events-none">
                    Marcador
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
