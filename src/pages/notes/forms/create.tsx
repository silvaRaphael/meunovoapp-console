import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "lib/axios";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateNoteSchema, createNoteSchema } from "adapters/note";
import { useLanguage } from "components/shared/language-provider";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Input } from "components/ui/input";
import { SubmitButton } from "components/shared/submit-button";
import { ContentAlert } from "components/shared/content-alert";
import { Button } from "components/ui/button";
import { useState } from "react";
import { Project } from "pages/projects/data/project";
import { Textarea } from "components/ui/textarea";
import { Note } from "../data/note";

export function CreateNoteForm({ label }: { label?: string; project_id?: string; projects?: Project[] }) {
  const { language, writeLang } = useLanguage();

  const [open, setOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      markers: [{ value: "" }],
    },
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "markers",
    control: form.control,
    rules: {
      minLength: 1,
    },
  });

  const createNote = async (data: CreateNoteSchema) => {
    return await api.post(
      `/notes`,
      {
        ...data,
        markers: data.markers?.map((item) => item.value).filter((item) => item.trim()) ?? [],
      },
      { headers: { "Content-Language": language.locale } },
    );
  };

  const { mutate: createNoteFn } = useMutation({
    mutationKey: ["notes"],
    mutationFn: createNote,
    onSuccess(data, variables) {
      queryClient.setQueryData(["notes"], (items: Note[]) => [
        ...items,
        {
          id: (data as any).data.id,
          title: variables.title,
          content: variables.content,
          markers: variables.markers?.map((item) => item.value).filter((item) => item.trim()) ?? [],
        },
      ]);
      setOpen(false);
      form.reset({
        title: "",
        content: "",
        markers: [{ value: "" }],
      });
    },
  });

  function onSubmit(data: CreateNoteSchema) {
    createNoteFn(data);
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
            <div className="flex space-x-3 items-end">
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`markers.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={
                              writeLang([
                                ["en", "Marker"],
                                ["pt", "Marcador"],
                              ]) as string
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button type="button" variant="outline" onClick={() => append({ value: "" })}>
                {writeLang([
                  ["en", "Add marker"],
                  ["pt", "Adicionar marcador"],
                ])}
              </Button>
            </div>
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
