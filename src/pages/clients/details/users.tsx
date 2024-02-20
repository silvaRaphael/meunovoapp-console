import { DataTable } from '../../../components/ui/data-table/data-table'
import { Client } from '../data/client'
import { useLanguage } from '../../../components/shared/language-provider'
import { userColumns } from '../data/user-columns'
import { User } from 'pages/users/data/user'

export interface UserRow extends User {
  inviteAction?: (props: User) => any
}

export function ClientUsers({ client }: { client: Client }) {
  const { language, writeLang } = useLanguage()

  return <DataTable columns={userColumns(language, writeLang)} data={client.users ?? []} />
}
