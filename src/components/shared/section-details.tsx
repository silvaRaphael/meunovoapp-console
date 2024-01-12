import { ReactNode } from "react";

export function SectionDetails({ title, subtitle }: { title: string | ReactNode; subtitle?: string | ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
