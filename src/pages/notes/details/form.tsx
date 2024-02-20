import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Note } from '../data/note'
import { SubmitButton } from '../../../components/shared/submit-button'
import { toast } from '../../../components/ui/toast/use-toast'
import { HandleRequest } from '../../../lib/handle-request'
import { CreateNoteSchema, createNoteSchema } from 'adapters/note'
import { useLanguage } from 'components/shared/language-provider'
import { errorToast } from 'components/shared/error-toast'
import { Separator } from 'components/ui/separator'

export function NoteForm({ note }: { note: Note }) {
  const { language, writeLang } = useLanguage()

  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: note.title,
      content: note.content ?? '',
      markers: []
    },
    mode: 'onChange'
  })

  async function onSubmit(data: CreateNoteSchema) {
    const request = await new HandleRequest(data).put(`/notes/${note.id}`, { language })

    request.onDone(() => {
      toast({
        title: writeLang([
          ['en', 'Note has been updated successfully!'],
          ['pt', 'Nota foi atualizada com sucesso!']
        ]) as string
      })
    })

    request.onError((error) => errorToast(error))
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12">
          <div className="col-span-12 sm:col-span-3 mb-4 sm:m-0">
            <h3 className="font-semibold leading-4">
              {writeLang([
                ['en', 'Note'],
                ['pt', 'Nota']
              ])}
            </h3>
            <p className="text-sm text-muted-foreground">
              {writeLang([
                ['en', 'Change note info'],
                ['pt', 'Alterar informações da nota']
              ])}
            </p>
          </div>
          <div className="col-span-12 sm:col-span-6 space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormDescription>
                    {writeLang([
                      ['en', 'Note title'],
                      ['pt', 'Título da nota']
                    ])}
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder={
                        writeLang([
                          ['en', 'Note title'],
                          ['pt', 'Título da nota']
                        ]) as string
                      }
                      {...field}
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
                  <FormDescription>
                    {writeLang([
                      ['en', 'Note content'],
                      ['pt', 'Descrição da nota']
                    ])}
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder={
                        writeLang([
                          ['en', 'Describe the note'],
                          ['pt', 'Descreva a nota']
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
          </div>
        </div>
        <Separator />
        <SubmitButton
          label={
            writeLang([
              ['en', 'Update Note'],
              ['pt', 'Atualizar Nota']
            ]) as string
          }
          type="submit"
          state={form.formState.isSubmitting ? 'loading' : 'initial'}
        />
      </form>
    </Form>
  )
}
