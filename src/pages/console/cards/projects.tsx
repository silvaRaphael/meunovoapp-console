import { Langs } from "config/languages";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function ProjectsCard({
  projects,
  writeLang,
}: {
  projects: {
    name: string;
    progress: number;
  }[];
  writeLang: (texts: [Langs, React.ReactNode][]) => React.ReactNode;
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      {projects.length ? (
        <BarChart layout="vertical" data={projects}>
          <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
          <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={20} width={120} />
          <Bar dataKey="progress" fill="currentColor" radius={[0, 4, 4, 0]} className="fill-primary" />
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
