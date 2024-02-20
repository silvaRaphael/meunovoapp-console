import { CompleteProfileForm } from './form'
import { Logo } from 'components/shared/logo'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HandleRequest } from 'lib/handle-request'
import { useUserData } from 'components/shared/user-data-provider'
import { toast } from 'components/ui/toast/use-toast'
import { useLanguage } from 'components/shared/language-provider'
import { AuthScreen } from 'components/shared/auth-screen'

export function CompleteProfile() {
  document.title = 'Começar - Console | MeuNovoApp'

  const { writeLang } = useLanguage()
  const { userData, removeUserData } = useUserData()

  const navigate = useNavigate()

  const id = new URL(window.location.href).searchParams.get('u')

  const [loading, setLoading] = useState<boolean>(true)
  const [userEmail, setUserEmail] = useState<string>('')
  const [quote, setQuote] = useState<string>('')

  async function canUpdate() {
    const request = await new HandleRequest().get(`/users/can-update/${id}`)

    request.onDone((response) => {
      setUserEmail(response.email)
      setLoading(false)
    })

    request.onError(() => {
      navigate('/login')
    })
  }

  useEffect(() => {
    if (!id) navigate('/login')

    setLoading(false)

    if (userData?.email) {
      removeUserData()
      ;(async () => {
        const request = await new HandleRequest().get('/auth/sign-out')
        request.onDone(() => {
          toast({
            title: writeLang([
              ['en', 'You left console!'],
              ['pt', 'Você saiu do console!']
            ]) as string
          })
        })
      })()
    }

    canUpdate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!id || !userEmail || loading) return <></>

  return (
    <AuthScreen
      quote={
        quote
          ? quote
          : (writeLang([
              ['en', "Let's get to know a little bit about you."],
              ['pt', 'Vamos conhecer um pouco sobre você.']
            ]) as string)
      }
      className="h-96 flex justify-start"
    >
      <div className="flex flex-col space-y-2 mb-2 text-center">
        <Logo className="justify-center" />
        <p className="text-sm text-muted-foreground">
          {writeLang([
            ['en', 'Complete your profile to access your account'],
            ['pt', 'Complete seu perfil para acessar sua conta']
          ])}
        </p>
      </div>
      <CompleteProfileForm id={id} email={userEmail} setQuote={setQuote} />
    </AuthScreen>
  )
}
