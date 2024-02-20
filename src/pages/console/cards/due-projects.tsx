import { Calendar } from 'components/ui/calendar'
import { Langs } from 'config/languages'
import { addMonths } from 'date-fns'
import { useNavigate } from 'react-router-dom'

export function CalendarCard({
  locale,
  projects,
  writeLang
}: {
  locale?: Locale
  projects: {
    id: string
    name: string
    progress: number
    due: Date
  }[]
  writeLang: (texts: [Langs, React.ReactNode][]) => React.ReactNode
}) {
  const navigate = useNavigate()

  return (
    <Calendar
      locale={locale}
      mode="multiple"
      fromMonth={new Date()}
      toMonth={addMonths(new Date(), 12)}
      numberOfMonths={2}
      selected={projects.map((item) => new Date(item.due))}
      onDayClick={(day) => {
        const project = projects.find((item) => new Date(item.due).getTime() === day.getTime())

        if (!project?.id) return

        navigate(
          `${writeLang([
            ['en', '/projects'],
            ['pt', '/projetos']
          ])}/${project.id}`
        )
      }}
    />
  )
}
