import { CreateClientSchema, createClientSchema } from "adapters/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "components/shared/language-provider";
import { toast } from "components/ui/toast/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form";
import { Input } from "components/ui/input";
import { SubmitButton } from "components/shared/submit-button";
import { ContentAlert } from "components/shared/content-alert";
import { Button } from "components/ui/button";
import { useState } from "react";
import { api } from "lib/axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "components/shared/query";
import { Client } from "../data/client";

export function CreateClientForm() {
  const { language, writeLang } = useLanguage();

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<CreateClientSchema>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {},
    mode: "onChange",
  });

  const createClient = async (data: CreateClientSchema) => {
    return await api.post(`/clients`, data, { headers: { "Content-Language": language.locale } });
  };

  const { mutate: createClientFn } = useMutation({
    mutationKey: ["clients"],
    mutationFn: createClient,
    onSuccess(data, variables) {
      queryClient.setQueryData(["clients"], (items: Client[]) => [
        ...items,
        {
          id: (data as any).data.id,
          company: variables.company,
        },
      ]);

      toast({
        title: writeLang([
          ["en", "Client has been created successfully!"],
          ["pt", "Cliente foi criado com sucesso!"],
        ]) as string,
      });

      form.reset({
        company: "",
      });

      setOpen(false);
    },
  });

  function handleCreate(data: CreateClientSchema) {
    createClientFn(data);
  }

  return (
    <ContentAlert
      open={open}
      onOpenChange={setOpen}
      title={
        writeLang([
          ["en", "Add new client"],
          ["pt", "Adicionar novo cliente"],
        ]) as string
      }
      triggerButton={
        <Button>
          {writeLang([
            ["en", "Create"],
            ["pt", "Novo"],
          ])}
        </Button>
      }
      hideCloseButton
    >
      <Form {...form}>
        <form className="grid" onSubmit={form.handleSubmit(handleCreate)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Input
                      placeholder={
                        writeLang([
                          ["en", "Company name"],
                          ["pt", "Nome da empresa"],
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
            <SubmitButton
              label={
                writeLang([
                  ["en", "Add Client"],
                  ["pt", "Adicionar Cliente"],
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
