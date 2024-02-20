import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '../../../components/ui/data-table/data-table-column-header'
import { MemberInfo } from '../../../components/shared/member-info'
import { Badge } from 'components/ui/badge'
import { formatDistance } from 'date-fns'
import { Langs, languages } from 'config/languages'
import { Language } from 'components/shared/language-provider'
import { Actions } from 'components/shared/actions'
import { ClientInfo } from 'components/shared/client-info'
import { Link } from 'react-router-dom'
import { User } from './user'

export const userColumns = (
  language: Pick<Language, 'lang' | 'locale' | 'currency'>,
  writeLang: (texts: [Langs, React.ReactNode][]) => React.ReactNode
): ColumnDef<User>[] => {
  return [
    {
      accessorKey: 'client',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={
            writeLang([
              ['en', 'Client'],
              ['pt', 'Cliente']
            ]) as string
          }
        />
      ),
      cell: ({ row }) => {
        if (!row.original.client) return <></>
        return (
          <ClientInfo
            id={row.original.client.id}
            logotipo={row.original.client.logotipo}
            company={row.original.client.company}
          />
        )
      }
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={
            writeLang([
              ['en', 'Nome'],
              ['pt', 'Nome']
            ]) as string
          }
        />
      ),
      cell: ({ row }) => {
        return (
          <Link
            to={
              writeLang([
                ['en', `/users/${row.original.id}`],
                ['pt', `/usuarios/${row.original.id}`]
              ]) as string
            }
          >
            <div className="flex items-center space-x-4">
              <MemberInfo avatar={row.original.avatar} email={row.original.email} name={row.original.name} />
              {row.original.is_manager && (
                <Badge variant="outline" className="h-min">
                  {writeLang([
                    ['en', 'Manager'],
                    ['pt', 'Responsável']
                  ])}
                </Badge>
              )}
            </div>
          </Link>
        )
      }
    },
    {
      id: 'actived_time',
      cell: ({ row }) => {
        if (!row.original.activated_at) return <></>

        const distanceTime = formatDistance(new Date(row.original.activated_at), new Date(), {
          locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
          addSuffix: true
        })

        return (
          <>
            {writeLang([
              ['en', 'Active '],
              ['pt', 'Ativo ']
            ])}{' '}
            {distanceTime}
          </>
        )
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <Actions.Edit
              to={
                writeLang([
                  ['en', `/users/${row.original.id}`],
                  ['pt', `/usuarios/${row.original.id}`]
                ]) as string
              }
            />
          </div>
        )
      }
    }
  ]
}
