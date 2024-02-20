import React from 'react'
import { InviteUserSchema, inviteUserSchema } from 'adapters/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HandleRequest } from 'lib/handle-request'
import { useLanguage } from 'components/shared/language-provider'
import { toast } from 'components/ui/toast/use-toast'
import { errorToast } from 'components/shared/error-toast'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'components/ui/form'
import { Input } from 'components/ui/input'
import { SubmitButton } from 'components/shared/submit-button'
import { ContentAlert } from 'components/shared/content-alert'

export function SendResetPasswordForm({
  label,
  open,
  setOpen
}: {
  label: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { language, writeLang } = useLanguage()

  const form = useForm<InviteUserSchema>({
    resolver: zodResolver(inviteUserSchema),
    mode: 'onChange'
  })

  async function onSubmit(data: InviteUserSchema) {
    const request = await new HandleRequest({
      email: data.email
    }).post('/users/reset-password', { language })

    request.onDone(() => {
      toast({
        title: writeLang([
          ['en', 'Recovery message was sent'],
          ['pt', 'Mensagem de recuperação enviada']
        ]) as string,
        description: writeLang([
          ['en', 'An email with instructions has been sent to you!'],
          ['pt', 'Um e-mail com instruções foi enviado para você!']
        ]) as string
      })

      form.reset({
        email: ''
      })

      setOpen(false)
    })

    request.onError((error) => {
      errorToast(error)
    })
  }

  return (
    <ContentAlert
      open={open}
      onOpenChange={setOpen}
      title={
        writeLang([
          ['en', 'Recovery password'],
          ['pt', 'Recuperar senha']
        ]) as string
      }
      description={
        writeLang([
          ['en', 'Enter your email below and we will send you a message with instructions.'],
          ['pt', 'Digite o seu e-mail abaixo, que enviaremos uma mensagem com instruções.']
        ]) as string
      }
      triggerButton={<>{label}</>}
      hideCloseButton
    >
      <Form {...form}>
        <form className="grid" onSubmit={form.handleSubmit(onSubmit)}>
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
                          ['en', 'name@example.com'],
                          ['pt', 'nome@exemplo.com.br']
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
                  ['en', 'Send email'],
                  ['pt', 'Enviar e-mail']
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
