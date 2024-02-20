import { DataTable } from '../../../components/ui/data-table/data-table'
import { useLanguage } from '../../../components/shared/language-provider'
import { Project } from '../data/project'
import { taskColumns } from 'pages/tasks/data/columns'

export function ProjectTasks({ project }: { project: Project }) {
  const { language, writeLang } = useLanguage()

  return (
    <DataTable
      columns={taskColumns(language, writeLang).filter((column) => !['client', 'project'].includes(column.id ?? ''))}
      data={project.tasks ?? []}
    />
  )
}
