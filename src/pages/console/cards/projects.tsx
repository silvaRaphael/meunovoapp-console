import { Langs } from "config/languages";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function ProjectsCard({
  projects,
  writeLang,
}: {
  projects: {
    id: string;
    name: string;
    progress: number;
    due: Date;
  }[];
  writeLang: (texts: [Langs, React.ReactNode][]) => React.ReactNode;
}) {
  const navigate = useNavigate();

  const goToProject = (e: any) => {
    const project = e.id ? e : projects[e.index];

    if (!project.id) return;

    navigate(
      `${writeLang([
        ["en", "/projects"],
        ["pt", "/projetos"],
      ])}/${project.id}`,
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      {projects.length ? (
        <BarChart layout="vertical" data={projects}>
          <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={20}
            width={125}
            allowDuplicatedCategory
            className="cursor-pointer"
            onClick={goToProject}
          />
          <Bar
            dataKey="progress"
            fill="currentColor"
            radius={[0, 4, 4, 0]}
            className="fill-primary cursor-pointer"
            onClick={goToProject}
          />
        </BarChart>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <span className="font-medium text-muted-foreground">
            {writeLang([
              ["en", "No projects yet."],
              ["pt", "Nenhum projeto ainda."],
            ])}
          </span>
        </div>
      )}
    </ResponsiveContainer>
  );
}
