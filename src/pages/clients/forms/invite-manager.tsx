import React, { useState } from 'react'
import { InviteUserSchema, inviteUserSchema } from 'adapters/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLanguage } from 'components/shared/language-provider'
import { toast } from 'components/ui/toast/use-toast'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'components/ui/form'
import { Input } from 'components/ui/input'
import { SubmitButton } from 'components/shared/submit-button'
import { ContentAlert } from 'components/shared/content-alert'
import { Client } from '../data/client'
import { useMutation } from '@tanstack/react-query'
import { api } from 'lib/axios'
import { queryClient } from 'components/shared/query'

export function InviteManagerForm({
  triggerButton,
  client
}: {
  triggerButton: React.ReactElement
  client: Client | null
}) {
  const { language, writeLang } = useLanguage()

  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<InviteUserSchema>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {},
    mode: 'onChange'
  })

  const inviteUser = async (data: InviteUserSchema) => {
    if (!client) return

    return await api.post(
      '/users',
      {
        email: data.email,
        client_id: client.id,
        is_manager: true
      },
      { headers: { 'Content-Language': language.locale } }
    )
  }

  const { mutate: inviteUserFn } = useMutation({
    mutationKey: ['clients'],
    mutationFn: inviteUser,
    onSuccess(data, variables) {
      queryClient.setQueryData(['clients'], (items: Client[]) => {
        return items.map((item) => {
          if (item.id === client?.id) {
            return {
              ...item,
              users: [
                {
                  id: (data as any).data.id,
                  name: null,
                  email: variables.email,
                  is_manager: true
                }
              ]
            }
          }

          return item
        })
      })

      toast({
        title: writeLang([
          ['en', 'Manager has been invited successfully!'],
          ['pt', 'Responsável foi convidado com sucesso!']
        ]) as string
      })

      form.reset({
        email: ''
      })

      setOpen(false)
    }
  })

  function handleInvite(data: InviteUserSchema) {
    inviteUserFn(data)
  }

  return (
    <ContentAlert
      open={open}
      triggerButton={triggerButton}
      onOpenChange={() => setOpen(!open)}
      title={
        writeLang([
          ['en', 'Invite new manager'],
          ['pt', 'Convidar novo responsável']
        ]) as string
      }
      hideCloseButton
    >
      <Form {...form}>
        <form className="grid" onSubmit={form.handleSubmit(handleInvite)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Input
                      placeholder={
                        writeLang([
                          ['en', 'Email'],
                          ['pt', 'E-mail']
                        ]) as string
                      }
                      maxLength={50}
                      value={field.value || ''}
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
                  ['en', 'Invite Manager'],
                  ['pt', 'Convidar Responsável']
                ]) as string
              }
              type="submit"
              state={form.formState.isSubmitting ? 'loading' : 'initial'}
              className="w-full"
            />
          </div>
        </form>
      </Form>
    </ContentAlert>
  )
}
