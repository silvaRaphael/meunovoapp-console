import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../components/ui/form'
import { SubmitButton } from '../../../components/shared/submit-button'
import { toast } from '../../../components/ui/toast/use-toast'
import { Label } from '../../../components/ui/label'
import { useLanguage } from 'components/shared/language-provider'
import { Switch } from 'components/ui/switch'
import { PreferencesSchema, preferencesSchema } from 'adapters/preferences'
import { HandleRequest } from 'lib/handle-request'
import { errorToast } from 'components/shared/error-toast'
import { useUserData } from 'components/shared/user-data-provider'
import { Separator } from 'components/ui/separator'

export function NotificationsPreferencesForm({ preferences }: { preferences: PreferencesSchema }) {
  const { userData } = useUserData()
  const { language, writeLang } = useLanguage()

  const form = useForm<PreferencesSchema>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      email_notification: preferences.email_notification,
      console_notification: preferences.console_notification
    },
    mode: 'onChange'
  })

  async function onSubmit(data: PreferencesSchema) {
    if (!userData) return

    const request = await new HandleRequest({
      email_notification: data.email_notification,
      console_notification: data.console_notification
    }).put('/preferences', { language })

    request.onDone(() => {
      toast({
        variant: 'success',
        title: writeLang([
          ['en', 'Preferences updated successfully!'],
          ['pt', 'Preferências atualizadas com sucesso!']
        ]) as string
      })
    })

    request.onError((error) => errorToast(error))
  }

  return (
    <Form {...form}>
      <form className="flex flex-col justify-between space-y-8 h-[200px]" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12">
          <div className="col-span-12 space-y-4">
            <FormField
              control={form.control}
              name="email_notification"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="email_notification"
                        checked={field.value}
                        name={field.name}
                        ref={field.ref}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="email_notification" className="space-y-2">
                        <span>
                          {writeLang([
                            ['en', 'Email notification'],
                            ['pt', 'Notificações por E-mail']
                          ])}
                        </span>
                        <FormDescription>
                          {writeLang([
                            ['en', <>{field.value ? 'Disable' : 'Enable'} email notifications</>],
                            ['pt', <>{field.value ? 'Desabilitar' : 'Habilitar'} notificações por e-mail</>]
                          ])}
                        </FormDescription>
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="console_notification"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="console_notifications"
                        checked={field.value}
                        name={field.name}
                        ref={field.ref}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="console_notifications" className="space-y-2">
                        <span>
                          {writeLang([
                            ['en', 'Console notification'],
                            ['pt', 'Notificações pelo Console']
                          ])}
                        </span>
                        <FormDescription>
                          {writeLang([
                            ['en', <>{field.value ? 'Disable' : 'Enable'} console notifications</>],
                            ['pt', <>{field.value ? 'Desabilitar' : 'Habilitar'} notificações pelo console</>]
                          ])}
                        </FormDescription>
                      </Label>
                    </div>
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
              ['en', 'Update Preferences'],
              ['pt', 'Atualizar Preferências']
            ]) as string
          }
          type="submit"
          state={form.formState.isSubmitting ? 'loading' : 'initial'}
          className="w-full"
        />
      </form>
    </Form>
  )
}
