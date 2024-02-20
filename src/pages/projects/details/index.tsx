import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SectionHeader } from '../../../components/shared/section-header'
import { ProjectForm } from './form'
import { Page } from '../../../components/shared/page'
import { Project } from '../data/project'
import { Tabs, TabsContent, TabsList, TabsTrigger, changeTab } from '../../../components/ui/tabs'
import { HandleRequest } from '../../../lib/handle-request'
import { useLanguage } from '../../../components/shared/language-provider'
import { errorToast } from 'components/shared/error-toast'
import { ProjectTasks } from './tasks'
import { CreateTaskForm } from 'pages/tasks/forms/create'
import { hasPermission } from 'lib/handle-permission'
import { useUserData } from 'components/shared/user-data-provider'
import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert'
import { AlarmClockOff } from 'lucide-react'

export function ProjectDetails() {
  const { id } = useParams()
  const { language, writeLang } = useLanguage()
  const { userData } = useUserData()

  const [project, setProject] = useState<Project>()
  const [tab, setTab] = useState<string>(new URL(window.location.href).searchParams.get('tab') ?? '0')

  async function getProject(id?: string) {
    const request = await new HandleRequest().get(`/projects/${id}`, { language })

    request.onDone((response) => {
      setProject(response)
    })

    request.onError((error) => {
      errorToast(error)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    getProject(id)

    return () => {
      controller.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!project) return <></>

  return (
    <Page
      pathname={
        writeLang([
          ['en', '/projects'],
          ['pt', '/projetos']
        ]) as string
      }
      header={
        <SectionHeader
          title={
            writeLang([
              ['en', 'Projects'],
              ['pt', 'Projetos']
            ]) as string
          }
          tree={project ? [{ label: project.name }] : []}
        >
          {tab === '1' && !['completed', 'cancelled'].includes(project.status) && hasPermission(userData) && (
            <CreateTaskForm
              label={
                writeLang([
                  ['en', 'Create task'],
                  ['pt', 'Nova tarefa']
                ]) as string
              }
              project_id={project.id}
              onCreated={() => getProject(id)}
            />
          )}
        </SectionHeader>
      }
    >
      <div className="space-y-6 pb-10">
        {new Date(project.due) < new Date() && !['completed', 'cancelled'].includes(project.status) && (
          <Alert className="bg-destructive text-white [&>svg]:text-white">
            <AlarmClockOff className="h-4 w-4" />
            <AlertTitle>
              {writeLang([
                ['en', 'Heads up!'],
                ['pt', 'Atenção!']
              ])}
            </AlertTitle>
            <AlertDescription>
              {writeLang([
                ['en', 'This project is late!'],
                ['pt', 'Este projeto está atrasado!']
              ])}
            </AlertDescription>
          </Alert>
        )}
        <Tabs defaultValue="0" className="w-full" value={tab} onValueChange={(tab) => changeTab(tab, setTab)}>
          <TabsList className="sm:w-min w-full flex mx-auto">
            <TabsTrigger value="0" className="w-full sm:w-36">
              {writeLang([
                ['en', 'Project'],
                ['pt', 'Projeto']
              ])}
            </TabsTrigger>
            <TabsTrigger value="1" className="w-full sm:w-36">
              {writeLang([
                ['en', 'Tasks'],
                ['pt', 'Tarefas']
              ])}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="0" className="pt-3">
            <ProjectForm project={project} />
          </TabsContent>
          <TabsContent value="1" className="pt-3">
            <ProjectTasks project={project} />
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  )
}
