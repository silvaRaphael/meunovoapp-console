import { useEffect, useState } from 'react'
import { DataTable } from 'components/ui/data-table/data-table'
import { SectionHeader } from 'components/shared/section-header'
import { Page } from 'components/shared/page'
import { useLanguage } from 'components/shared/language-provider'
import { HandleRequest } from 'lib/handle-request'
import { Project } from './data/project'
import { projectColumns } from './data/columns'
import { errorToast } from 'components/shared/error-toast'
import { useUserData } from 'components/shared/user-data-provider'
import { CreateProjectForm } from './forms/create'
import { Client } from 'pages/clients/data/client'
import { HandlePermission } from 'lib/handle-permission'

export function Projects() {
  const { userData } = useUserData()
  const { language, writeLang } = useLanguage()

  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])

  async function getProjects() {
    const request = await new HandleRequest().get('/projects', { language })

    request.onDone((response) => {
      setProjects(response)
    })

    request.onError((error) => {
      errorToast(error)
    })
  }

  async function getClients() {
    const request = await new HandleRequest().get('/clients', { language })

    request.onDone((response) => {
      setClients(response)
    })

    request.onError((error) => {
      errorToast(error)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    getProjects()
    if (userData && userData.role === 'master') getClients()

    return () => {
      controller.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              ['en', `Projects (${projects.length})`],
              ['pt', `Projetos (${projects.length})`]
            ]) as string
          }
        >
          {HandlePermission(<CreateProjectForm clients={clients} onCreated={getProjects} />)}
        </SectionHeader>
      }
    >
      <DataTable columns={projectColumns(language, writeLang)} data={projects} />
    </Page>
  )
}
