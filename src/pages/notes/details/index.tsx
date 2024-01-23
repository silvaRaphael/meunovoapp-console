import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { NoteForm } from "./form";
import { Page } from "../../../components/shared/page";
import { Note } from "../data/note";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/shared/language-provider";
import { errorToast } from "components/shared/error-toast";

export function NoteDetails() {
  const { language, writeLang } = useLanguage();
  const { id } = useParams();

  const [note, setNote] = useState<Note>();

  async function getNote(id?: string) {
    const request = await new HandleRequest().get(`/notes/${id}`, { language });

    request.onDone((response) => {
      setNote(response);
    });

    request.onError((error) => {
      errorToast(error);
    });
  }

  useEffect(() => {
    const controller = new AbortController();

    getNote(id);

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!note) return <></>;

  return (
    <Page
      pathname={
        writeLang([
          ["en", "/notes"],
          ["pt", "/tarefas"],
        ]) as string
      }
      header={
        <SectionHeader
          title={
            writeLang([
              ["en", "Notes"],
              ["pt", "Tarefas"],
            ]) as string
          }
          tree={!!note ? [{ label: note.title }] : []}
        ></SectionHeader>
      }
    >
      <div className="space-y-6 pb-10">
        <NoteForm note={note} />
      </div>
    </Page>
  );
}
