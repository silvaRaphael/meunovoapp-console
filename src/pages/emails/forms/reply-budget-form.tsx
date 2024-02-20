import { Loader } from 'lucide-react'

import { Button } from 'components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from 'components/ui/form'
import { Input } from 'components/ui/input'
import { toast } from 'components/ui/toast/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { Textarea } from 'components/ui/textarea'
import { useState } from 'react'
import { Email } from '../data/email'
import { SENDER_EMAIL } from 'config/constants'
import { EmailSchema, emailSchema } from 'adapters/email'
import { errorToast } from 'components/shared/error-toast'
import { HandleRequest } from 'lib/handle-request'
import { useLanguage } from 'components/shared/language-provider'
import { addDays, format } from 'date-fns'
import { languages } from 'config/languages'

export function EmailReplyBudget({ email }: { email: Email }) {
  const { language, writeLang } = useLanguage()

  const [replySent, setReplySent] = useState<'not-sent' | 'sending' | 'sent'>(email.has_reply ? 'sent' : 'not-sent')

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
    defaultValues: {
      subject: 'Sua Mensagem foi Respondida - MeuNovoApp',
      name: '',
      projectDetails: 'Nome do Projeto: [Nome do Projeto]\nDescrição: [Breve descrição do projeto e seus objetivos]',
      projectScope: [
        {
          title: 'Desenvolvimento de Aplicativo Móvel:',
          value:
            '- Criação de um aplicativo personalizado para plataformas iOS e Android.\n- Interface de usuário intuitiva e experiência do usuário aprimorada.'
        },
        {
          title: 'Sistema Web Sob Medida:',
          value:
            '- Desenvolvimento de um sistema web robusto e escalável.\n- Integração de funcionalidades específicas.'
        }
      ],
      projectDueDays: '60',
      projectPayment:
        'Nossa proposta inclui um investimento total de [Valor], dividido da seguinte forma:\n\n[Detalhes da Estrutura de Pagamento]',
      projectBenefits:
        '- Suporte contínuo pós-implantação.\n- Reuniões regulares de acompanhamento.\n- Garantia de qualidade e satisfação.\n'
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: 'projectScope',
    control: form.control
  })

  async function onSubmit(data: EmailSchema) {
    setReplySent('sending')

    const request = await new HandleRequest({
      title: 'Resposta Contato - MeuNovoApp',
      name: data.name,
      from: SENDER_EMAIL,
      to: Array.isArray(email.to) ? email.to.flat() : email.to,
      subject: data.subject,
      projectDetails: data.projectDetails,
      projectScope: data.projectScope,
      projectStartDate: format(addDays(new Date(), 7), 'PPP', {
        locale: languages.find((item) => item.lang === language.lang)?.dateLocale
      }),
      projectEndDate: format(addDays(new Date(), 7 + Number(data.projectDueDays ?? 0)), 'PPP', {
        locale: languages.find((item) => item.lang === language.lang)?.dateLocale
      }),
      projectPayment: data.projectPayment,
      projectBenefits: data.projectBenefits
    }).post('/emails/reply-budget-message', { language })

    request.onDone(() => {
      toast({
        title: writeLang([
          ['en', 'Your proposal has been sent!'],
          ['pt', 'Sua proposta foi enviada!']
        ]) as string
      })
      setReplySent('sent')
    })

    request.onError((error) => {
      errorToast(error)
      setReplySent('not-sent')
    })
  }

  if (replySent === 'sent')
    return (
      <div className="w-full text-center py-20">
        <h4 className="text-2xl font-semibold text-center text-muted-foreground">
          {writeLang([
            ['en', 'Reply sent!'],
            ['pt', 'Resposta enviada!']
          ])}
        </h4>
      </div>
    )

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormDescription>
                {writeLang([
                  ['en', 'Email subject'],
                  ['pt', 'Assunto do e-mail']
                ])}
              </FormDescription>
              <FormControl>
                <Input
                  placeholder={
                    writeLang([
                      ['en', 'Email subject'],
                      ['pt', 'Assunto do e-mail']
                    ]) as string
                  }
                  className="bg-muted/50 border"
                  maxLength={65}
                  onChange={field.onChange}
                  value={field.value || ''}
                  ref={field.ref}
                  name={field.name}
                />
              </FormControl>
              <div className="flex">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormDescription>
                {writeLang([
                  ['en', 'Contact name'],
                  ['pt', 'Nome do contato']
                ])}
              </FormDescription>
              <FormControl>
                <Input
                  placeholder={
                    writeLang([
                      ['en', 'Contact name'],
                      ['pt', 'Nome do contato']
                    ]) as string
                  }
                  className="bg-muted/50 border"
                  maxLength={50}
                  onChange={field.onChange}
                  value={field.value || ''}
                  ref={field.ref}
                  name={field.name}
                />
              </FormControl>
              <div className="flex">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDetails"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormDescription>
                {writeLang([
                  ['en', 'Project details'],
                  ['pt', 'Detalhes do projeto']
                ])}
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder={
                    writeLang([
                      ['en', 'Project details'],
                      ['pt', 'Detalhes do projeto']
                    ]) as string
                  }
                  className="bg-muted/50 border whitespace-pre-line"
                  rows={5}
                  onChange={field.onChange}
                  value={field.value || ''}
                  ref={field.ref}
                  name={field.name}
                />
              </FormControl>
              <div className="flex">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="space-y-2">
          {fields.map((field, i) => (
            <div key={i} className="grid grid-cols-5 gap-4">
              <div className="col-span-2 space-y-2">
                <div className="flex items-end space-x-2">
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`projectScope.${i}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormDescription>
                            {writeLang([
                              ['en', 'Scope title'],
                              ['pt', 'Título do escopo']
                            ])}
                          </FormDescription>
                          <FormControl>
                            <Input
                              placeholder={
                                writeLang([
                                  ['en', 'Scope title'],
                                  ['pt', 'Título do escopo']
                                ]) as string
                              }
                              className="bg-muted/50 border whitespace-pre-line"
                              onChange={field.onChange}
                              value={field.value || ''}
                              ref={field.ref}
                              name={field.name}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {i === fields.length - 1 && i !== 0 && (
                    <Button variant="destructive" onClick={() => remove(i)}>
                      {writeLang([
                        ['en', 'Remove'],
                        ['pt', 'Remover']
                      ])}
                    </Button>
                  )}
                </div>
                {i === fields.length - 1 && i !== 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => append({ title: '', value: '' })}
                  >
                    Adicionar Escopo
                    {writeLang([
                      ['en', 'Add Scope'],
                      ['pt', 'Adicionar Escopo']
                    ])}
                  </Button>
                )}
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`projectScope.${i}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormDescription>
                        {writeLang([
                          ['en', 'Project scope'],
                          ['pt', 'Escopo do projeto']
                        ])}
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder={
                            writeLang([
                              ['en', 'Project scope'],
                              ['pt', 'Escopo do projeto']
                            ]) as string
                          }
                          className="bg-muted/50 border whitespace-pre-line"
                          rows={3}
                          onChange={field.onChange}
                          value={field.value || ''}
                          ref={field.ref}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
        <FormField
          control={form.control}
          name="projectDueDays"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormDescription>
                {writeLang([
                  ['en', 'Due in days'],
                  ['pt', 'Prazo em dias']
                ])}
              </FormDescription>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder={
                    writeLang([
                      ['en', 'Due in days'],
                      ['pt', 'Prazo em dias']
                    ]) as string
                  }
                  className="bg-muted/50 border"
                  onChange={field.onChange}
                  value={field.value || ''}
                  ref={field.ref}
                  name={field.name}
                />
              </FormControl>
              <div className="flex">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectPayment"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormDescription>
                {writeLang([
                  ['en', 'Payment Structure'],
                  ['pt', 'Estrutura de pagamento']
                ])}
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder={
                    writeLang([
                      ['en', 'Payment Structure'],
                      ['pt', 'Estrutura de pagamento']
                    ]) as string
                  }
                  className="bg-muted/50 border"
                  rows={5}
                  onChange={field.onChange}
                  value={field.value || ''}
                  ref={field.ref}
                  name={field.name}
                />
              </FormControl>
              <div className="flex">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectBenefits"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormDescription>
                {writeLang([
                  ['en', 'Aditional Benefits'],
                  ['pt', 'Benefícios adicionais']
                ])}
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder={
                    writeLang([
                      ['en', 'Aditional Benefits'],
                      ['pt', 'Benefícios adicionais']
                    ]) as string
                  }
                  className="bg-muted/50 border"
                  rows={5}
                  onChange={field.onChange}
                  value={field.value || ''}
                  ref={field.ref}
                  name={field.name}
                />
              </FormControl>
              <div className="flex">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {!email.has_reply && (
          <div className="flex justify-end">
            <Button className="gap-x-1" disabled={replySent === 'sending'}>
              {replySent === 'sending' && <Loader size={14} className="animate-spin" />}
              {writeLang([
                ['en', 'Send Reply'],
                ['pt', 'Enviar Resposta']
              ])}
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}
