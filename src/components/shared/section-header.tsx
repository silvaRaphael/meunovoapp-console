import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "lib/utils";
import { ArrowLeft } from "lucide-react";

export function SectionHeader({
  isRoot = false,
  title,
  pathname,
  tree,
  children,
}: {
  isRoot?: boolean;
  title: string;
  pathname: string;
  tree?: { label: string; pathname?: string }[];
  children?: ReactNode;
}) {
  document.title = isRoot
    ? "Console | MeuNovoApp"
    : !tree?.length
    ? `${title} - Console | MeuNovoApp`
    : `${tree?.at(-1)?.label} - Console | MeuNovoApp`;

  const navigate = useNavigate();

  return (
    <div className="w-full pt-4">
      <div className="flex min-h-20 items-center px-4">
        <div className="flex flex-col text-2xl space-y-1">
          <span
            className={cn(
              "flex items-center font-semibold cursor-pointer",
              tree?.length ? "text-sm text-muted-foreground" : "",
            )}
            onClick={() => navigate(-1)}
          >
            {tree?.length && <ArrowLeft size={16} className="me-1" />}
            {title}
          </span>
          <div className="flex space-x-1">
            {tree?.map((item, i, arr) =>
              item.pathname ? (
                <Link
                  key={i}
                  to={item.pathname}
                  className={cn("text-2xl font-semibold", i < arr.length - 1 ? "text-sm text-muted-foreground" : "")}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  key={i}
                  className={cn("text-2xl font-semibold", i < arr.length - 1 ? "text-sm text-muted-foreground" : "")}
                >
                  {item.label}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">{children}</div>
      </div>
    </div>
  );
}
