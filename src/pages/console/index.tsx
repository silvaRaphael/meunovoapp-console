import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card'
import { Page } from '../../components/shared/page'
import { SectionHeader } from '../../components/shared/section-header'

import { useLanguage } from 'components/shared/language-provider'
import { ProjectsCard } from './cards/projects'
import { UsersCard } from './cards/users'
import { useEffect, useState } from 'react'
import { HandleRequest } from 'lib/handle-request'
import { errorToast } from 'components/shared/error-toast'
import { languages } from 'config/languages'
import { NotificationsPreferencesForm } from './cards/notification-preferences'
import { PreferencesSchema } from 'adapters/preferences'
import { Loader } from 'lucide-react'
import { CalendarCard } from './cards/due-projects'

export function Console() {
  const { language, writeLang } = useLanguage()

  const [isLoading, setIsloading] = useState<boolean>(true)
  const [projects, setProjects] = useState<
    {
      id: string
      name: string
      progress: number
      due: Date
    }[]
  >([])
  const [users, setUsers] = useState<
    {
      name: string
      email: string
      avatar: string
      activated_at: Date
      is_manager: boolean
    }[]
  >([])
  const [preferences, setPreferences] = useState<PreferencesSchema>()

  async function getProjects() {
    const request = await new HandleRequest().get('/dashboard/projects', { language })

    request.onDone((response) => {
      setProjects(response)
    })

    request.onError((error) => {
      errorToast(error)
    })
  }

  async function getUsers() {
    const request = await new HandleRequest().get('/dashboard/users', { language })

    request.onDone((response) => {
      setUsers(response)
    })

    request.onError((error) => {
      errorToast(error)
    })
  }

  async function getPreferences() {
    const request = await new HandleRequest().get('/preferences', { language })

    request.onDone((response) => {
      setPreferences(response)
    })

    request.onError((error) => {
      errorToast(error)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      await Promise.all([getProjects(), getUsers(), getPreferences()])
      setIsloading(false)
    })()

    return () => {
      controller.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Loading = () => (
    <div className="flex w-full h-[200px] justify-center items-center">
      <Loader size={16} className="animate-spin" />
    </div>
  )

  return (
    <Page pathname="/" header={<SectionHeader isRoot title={'Console'}></SectionHeader>}>
      <div className="space-y-8">
        <div className="grid grid-cols-12 gap-4">
          <Card className="lg:col-span-7 sm:col-span-6 col-span-12">
            <CardHeader>
              <CardTitle>
                {writeLang([
                  ['en', 'Projects'],
                  ['pt', 'Projetos']
                ])}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? <Loading /> : <ProjectsCard projects={projects} writeLang={writeLang} />}
            </CardContent>
          </Card>
          <Card className="lg:col-span-5 sm:col-span-6 col-span-12">
            <CardHeader>
              <CardTitle>
                {writeLang([
                  ['en', 'Users'],
                  ['pt', 'Usuários']
                ])}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? <Loading /> : <UsersCard users={users} language={language} writeLang={writeLang} />}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-wrap gap-4">
          <Card>
            <CardContent className="pt-2">
              <CalendarCard
                locale={languages.find((item) => item.lang === language.lang)?.dateLocale}
                projects={projects}
                writeLang={writeLang}
              />
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                {writeLang([
                  ['en', 'Notifications'],
                  ['pt', 'Notificações']
                ])}
              </CardTitle>
              <CardDescription>
                {writeLang([
                  ['en', 'Change your notification preferences'],
                  ['pt', 'Altere suas preferências de notificações']
                ])}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading || !preferences ? <Loading /> : <NotificationsPreferencesForm preferences={preferences} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  )
}
