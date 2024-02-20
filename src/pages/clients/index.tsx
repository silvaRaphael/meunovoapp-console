import { DataTable } from '../../components/ui/data-table/data-table'
import { SectionHeader } from '../../components/shared/section-header'
import { Page } from '../../components/shared/page'
import { Client } from './data/client'
import { clientColumns } from './data/columns'
import { useLanguage } from '../../components/shared/language-provider'
import { CreateClientForm } from './forms/create'
import { Ban, Loader } from 'lucide-react'
import { api } from 'lib/axios'
import { useQuery } from '@tanstack/react-query'
import { Alert, AlertDescription } from 'components/ui/alert'

export interface ClientRow extends Client {
  inviteAction?: (props: Client) => any
}

export function Clients() {
  const { language, writeLang } = useLanguage()

  const getClients = async (): Promise<Client[]> =>
    (await api.get('/clients', { headers: { 'Content-Language': language.locale } })).data

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients
  })

  const Loading = () => (
    <div className="flex w-full h-[500px] justify-center items-center">
      <Loader size={16} className="animate-spin" />
    </div>
  )

  return (
    <Page
      pathname={
        writeLang([
          ['en', '/clients'],
          ['pt', '/clientes']
        ]) as string
      }
      header={
        <SectionHeader
          title={
            writeLang([
              ['en', `Clients (${clients?.length ?? 0})`],
              ['pt', `Clientes (${clients?.length ?? 0})`]
            ]) as string
          }
        >
          <CreateClientForm />
        </SectionHeader>
      }
    >
      {isLoading ? (
        <Loading />
      ) : !clients?.length ? (
        <Alert>
          <Ban className="h-4 w-4" />
          <AlertDescription className="mt-[.35rem]">
            {writeLang([
              ['en', 'No clients yet!'],
              ['pt', 'Nenhum cliente ainda!']
            ])}
          </AlertDescription>
        </Alert>
      ) : (
        <DataTable columns={clientColumns(writeLang)} data={clients} />
      )}
    </Page>
  )
}
