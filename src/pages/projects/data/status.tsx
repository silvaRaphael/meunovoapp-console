import { ArrowRightCircle, CheckCircle2, Circle, XCircle } from 'lucide-react'
import { useLanguage } from 'components/shared/language-provider'

export type Status = 'waiting' | 'in progress' | 'completed' | 'cancelled'

export const statuses: Status[] = ['waiting', 'in progress', 'completed', 'cancelled']

export const statusesIcons = {
  waiting: <Circle size={16} className="text-muted-foreground" />,
  'in progress': <ArrowRightCircle size={16} className="text-muted-foreground" />,
  completed: <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />,
  cancelled: <XCircle size={16} className="text-red-600 dark:text-red-500" />
}

export const statusesColors = {
  waiting: '',
  'in progress': '',
  completed: 'text-green-600 dark:text-green-400',
  cancelled: 'text-red-600 dark:text-red-500'
}

export function GetStatus({ status }: { status: Status }) {
  const { writeLang } = useLanguage()

  const translatedStatus = {
    waiting: writeLang([
      ['en', 'waiting'],
      ['pt', 'aguardando']
    ]),
    'in progress': writeLang([
      ['en', 'in progress'],
      ['pt', 'em progresso']
    ]),
    completed: writeLang([
      ['en', 'completed'],
      ['pt', 'finalizado']
    ]),
    cancelled: writeLang([
      ['en', 'cancelled'],
      ['pt', 'cancelado']
    ])
  }[status]

  return <>{translatedStatus}</>
}
