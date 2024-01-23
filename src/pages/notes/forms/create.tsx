import { CreateNoteSchema, createNoteSchema } from "adapters/note";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandleRequest } from "lib/handle-request";
import { useLanguage } from "components/shared/language-provider";
import { toast } from "components/ui/toast/use-toast";
import { errorToast } from "components/shared/error-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Input } from "components/ui/input";
import { SubmitButton } from "components/shared/submit-button";
import { ContentAlert } from "components/shared/content-alert";
import { Button } from "components/ui/button";
import { useState } from "react";
import { Project } from "pages/projects/data/project";
import { Textarea } from "components/ui/textarea";

export function CreateNoteForm({
  label,
  onCreated,
}: {
  label?: string;
  project_id?: string;
  projects?: Project[];
  onCreated: Function;
}) {
  const { language, writeLang } = useLanguage();

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    mode: "onChange",
  });

  async function onSubmit(data: CreateNoteSchema) {
    const request = await new HandleRequest(data).post(`/Notes`, { language });

    request.onDone(() => {
      toast({
        title: writeLang([
          ["en", "Note has been created successfully!"],
          ["pt", "Nota foi criada com sucesso!"],
        ]) as string,
      });

      form.reset();

      setOpen(false);
      onCreated();
    });

    request.onError((error) => {
      errorToast(error);
    });
  }

  return (
    <ContentAlert
      open={open}
      onOpenChange={setOpen}
      title={
        writeLang([
          ["en", "Add new Note"],
          ["pt", "Adicionar nova Nota"],
        ]) as string
      }
      triggerButton={
        <Button>
          {label ??
            writeLang([
              ["en", "Create"],
              ["pt", "Nova"],
            ])}
        </Button>
      }
      hideCloseButton
    >
      <Form {...form}>
        <form className="grid" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Input
                      placeholder={
                        writeLang([
                          ["en", "Note title"],
                          ["pt", "Título da Nota"],
                        ]) as string
                      }
                      maxLength={50}
                      value={field.value || ""}
                      onChange={field.onChange}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Textarea
                      placeholder={
                        writeLang([
                          ["en", "Describe the note"],
                          ["pt", "Descreva a nota"],
                        ]) as string
                      }
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              label={
                writeLang([
                  ["en", "Add Note"],
                  ["pt", "Adicionar Nota"],
                ]) as string
              }
              type="submit"
              state={form.formState.isSubmitting ? "loading" : "initial"}
              className="w-full"
            />
          </div>
        </form>
      </Form>
    </ContentAlert>
  );
}
