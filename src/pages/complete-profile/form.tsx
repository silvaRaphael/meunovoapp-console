import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { SubmitButton } from '../../components/shared/submit-button'
import { toast } from '../../components/ui/toast/use-toast'
import { HandleRequest } from '../../lib/handle-request'
import { errorToast } from 'components/shared/error-toast'
import { useLanguage } from 'components/shared/language-provider'
import { UserData, useUserData } from 'components/shared/user-data-provider'
import { useState } from 'react'
import { Button } from 'components/ui/button'
import { ArrowRight, Lock, Save, UploadCloudIcon, User2 } from 'lucide-react'
import {
  AvatarSchema,
  CompleteUserSchema,
  UpdatePasswordSchema,
  avatarSchema,
  completeUserSchema,
  updatePasswordSchema
} from 'adapters/user'
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import { convertToBase64 } from 'lib/helper'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs'
import Cookies from 'js-cookie'
import { PasswordInput } from 'components/shared/password-input'

let emailTimeout: any

export function CompleteProfileForm({
  id,
  email,
  setQuote
}: {
  id: string
  email: string
  setQuote: React.Dispatch<React.SetStateAction<string>>
}) {
  const navigate = useNavigate()
  const { setUserData } = useUserData()
  const { language, writeLang } = useLanguage()

  const [avatar, setAvatar] = useState<string | null>(null)
  const [step, setStep] = useState<string>('step-1')
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null)
  const [passwordVisible, setPasswordVisible] = useState<boolean[]>([false, false])

  const formStep1 = useForm<CompleteUserSchema>({
    resolver: zodResolver(completeUserSchema),
    defaultValues: {
      email,
      ...(Cookies.get('step-1') ? JSON.parse(Cookies.get('step-1') ?? '{}') : {})
    },
    mode: 'onChange'
  })

  const formStep2 = useForm<AvatarSchema>({
    resolver: zodResolver(avatarSchema),
    mode: 'onChange'
  })

  const formStep3 = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onChange'
  })

  async function checkEmailAvailability(e: React.ChangeEvent<HTMLInputElement>) {
    const email = e.target.value

    if (!email.length) return

    const request = await new HandleRequest({ email }).post(`/users/can-use-email/${id}`, { language })

    request.onError(() => {
      formStep1.setError('email', {
        message: writeLang([
          ['en', 'Email not available'],
          ['pt', 'E-mail não disponível']
        ]) as string
      })
    })
  }

  function handleStep1(data: CompleteUserSchema) {
    Cookies.set('step-1', JSON.stringify(data))

    setStep('step-2')
    setQuote(
      writeLang([
        ['en', "Let's upload a profile image."],
        ['pt', 'Vamos subir uma imagem de perfil.']
      ]) as string
    )
  }

  function handleStep2() {
    setStep('step-3')
    setQuote(
      writeLang([
        ['en', "Let's create a secure password for your account."],
        ['pt', 'Vamos criar uma senha segura para sua conta.']
      ]) as string
    )
  }

  async function handleStep3(data: UpdatePasswordSchema) {
    const request = await new HandleRequest({
      ...formStep1.getValues(),
      ...data,
      avatar: avatarBase64 || ''
    }).put(`/users/complete/${id}`, { language })

    request.onDone((response) => {
      setUserData(response as unknown as UserData)

      toast({
        title: writeLang([
          ['en', 'You finished you registration!'],
          ['pt', 'Você finalizou seu cadastro!']
        ]) as string
      })

      formStep1.reset({
        name: '',
        email: ''
      })

      formStep3.reset({
        password: '',
        confirm_password: ''
      })

      return navigate('/')
    })

    request.onError((error) => {
      errorToast(error)
    })
  }

  return (
    <Tabs defaultValue="step-1" value={step} onValueChange={setStep}>
      <TabsList className="w-full mb-2">
        <TabsTrigger value="step-1" className="w-full gap-1" disabled={step !== 'step-1'}>
          <User2 size={14} />
          {writeLang([
            ['en', 'About you'],
            ['pt', 'Sobre você']
          ])}
        </TabsTrigger>
        <TabsTrigger value="step-2" className="w-full gap-1" disabled={step !== 'step-2'}>
          <Save size={14} />
          {writeLang([
            ['en', 'Profile'],
            ['pt', 'Perfil']
          ])}
        </TabsTrigger>
        <TabsTrigger value="step-3" className="w-full gap-1" disabled={step !== 'step-3'}>
          <Lock size={14} />
          {writeLang([
            ['en', 'Secure'],
            ['pt', 'Segurança']
          ])}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="step-1">
        <Form {...formStep1}>
          <form className="space-y-3" onSubmit={formStep1.handleSubmit(handleStep1)}>
            <div className="gap-1">
              <FormField
                control={formStep1.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormDescription>
                      {writeLang([
                        ['en', 'Enter your name'],
                        ['pt', 'Digite seu nome']
                      ])}
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder={
                          writeLang([
                            ['en', 'Your name'],
                            ['pt', 'Seu nome']
                          ]) as string
                        }
                        name={field.name}
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </FormControl>
                    <div className="flex">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={formStep1.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormDescription>
                      {writeLang([
                        ['en', 'Enter your email'],
                        ['pt', 'Digite seu e-mail']
                      ])}
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={
                          writeLang([
                            ['en', 'name@example.com'],
                            ['pt', 'nome@exemplo.com.br']
                          ]) as string
                        }
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        onChange={(e) => {
                          if (e.target.value.includes(' ')) e.target.value = e.target.value.replaceAll(' ', '')
                          field.onChange(e)
                          clearTimeout(emailTimeout)
                          emailTimeout = setTimeout(() => checkEmailAvailability(e), 1000)
                        }}
                        value={field.value}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </FormControl>
                    <div className="flex">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <Button className="gap-x-1 w-full" disabled={formStep1.formState.isSubmitting}>
                {writeLang([
                  ['en', 'Next step'],
                  ['pt', 'Próxima etapa']
                ])}
                <ArrowRight size={14} />
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="step-2">
        <Form {...formStep2}>
          <form className="space-y-3" onSubmit={formStep2.handleSubmit(handleStep2)}>
            <div className="col-span-12 sm:col-span-6 space-y-4">
              <div className="flex flex-col items-center space-y-3">
                <label htmlFor="avatar-input">
                  <Avatar className="w-32 h-32 p-0 aspect-square border cursor-pointer">
                    <AvatarImage src={avatarBase64 ? avatarBase64 : avatar || undefined} className="object-cover" />
                    <AvatarFallback className="bg-muted/50 hover:bg-accent/60 group">
                      <UploadCloudIcon className="text-muted-foreground/50 group-hover:text-primary/40" />
                    </AvatarFallback>
                  </Avatar>
                </label>
                <FormDescription>
                  {writeLang([
                    ['en', 'Upload your avatar'],
                    ['pt', 'Envie o seu avatar']
                  ])}
                </FormDescription>
                {(avatar || avatarBase64) && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setAvatar(null)
                      setAvatarBase64(null)
                    }}
                  >
                    {writeLang([
                      ['en', 'Remove Image'],
                      ['pt', 'Excluir Imagem']
                    ])}
                  </Button>
                )}
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Input
                      id="avatar-input"
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif"
                      onChange={(event) => {
                        if (!event.target) return
                        const { target } = event

                        if (!target.files?.length) return

                        const maxSizeInBytes = 1024 * 1024 * 1 // 1MB
                        const fileSize = target.files[0].size

                        if (fileSize > maxSizeInBytes) {
                          toast({
                            title: writeLang([
                              ['en', 'Error uploading file!'],
                              ['pt', 'Erro ao subir arquivo!']
                            ]) as string,
                            description: writeLang([
                              ['en', 'File size is bigger than limit (1MB).'],
                              ['pt', 'O tamanho do arquivo é maior que o limite (1MB).']
                            ]),
                            variant: 'destructive'
                          })
                          target.value = ''

                          return
                        }

                        convertToBase64(target.files[0], (result) => setAvatarBase64(result?.toString() || null))
                      }}
                      className="hidden"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            </div>
            <div className="w-full">
              <Button className="gap-x-1 w-full" disabled={formStep2.formState.isSubmitting}>
                {writeLang([
                  ['en', 'Next step'],
                  ['pt', 'Próxima etapa']
                ])}
                <ArrowRight size={14} />
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="step-3">
        <Form {...formStep3}>
          <form className="space-y-3" onSubmit={formStep3.handleSubmit(handleStep3)}>
            <div className="space-y-2">
              <FormField
                control={formStep3.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <PasswordInput
                        passwordVisible={passwordVisible[0]}
                        setPasswordVisible={() => setPasswordVisible([!passwordVisible[0], passwordVisible[1]])}
                        onChange={field.onChange}
                        value={field.value || ''}
                        placeholder={
                          writeLang([
                            ['en', 'Your password'],
                            ['pt', 'Sua senha']
                          ]) as string
                        }
                      />
                    </FormControl>
                    <div className="flex">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={formStep3.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <PasswordInput
                        passwordVisible={passwordVisible[0]}
                        setPasswordVisible={() => setPasswordVisible([!passwordVisible[0], passwordVisible[1]])}
                        onChange={field.onChange}
                        value={field.value || ''}
                        placeholder={
                          writeLang([
                            ['en', 'Confirm your password'],
                            ['pt', 'Confirme sua senha']
                          ]) as string
                        }
                      />
                    </FormControl>
                    <div className="flex">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <SubmitButton
                label={
                  writeLang([
                    ['en', 'Finish'],
                    ['pt', 'Finalizar']
                  ]) as string
                }
                type="submit"
                state={formStep3.formState.isSubmitting ? 'loading' : 'initial'}
                className="gap-x-1 w-full"
                disabled={formStep3.formState.isSubmitting}
              />
            </div>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}
