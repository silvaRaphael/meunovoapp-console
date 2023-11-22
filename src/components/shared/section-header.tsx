import { Link, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "./language-provider";

export function SectionHeader({ title, pathname, tree, children }: { title: string; pathname: string; tree?: { label: string; pathname?: string }[]; children?: ReactNode }) {
    const { writeLang } = useLanguage();
    const navigate = useNavigate();

    document.title = !tree?.length ? `${title} - Quat` : `${tree?.at(-1)?.label} - Quat`;

    return (
        <div className="border-b">
            <div className="flex h-12 items-center px-4">
                <div className="text-sm font-medium flex items-center space-x-2">
                    {tree?.length && (
                        <>
                            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                                <ChevronLeft size={14} className="me-1" />
                                {writeLang([
                                    ["en", "Go back"],
                                    ["pt", "Voltar"],
                                ])}
                            </Button>
                            <div className="h-6 border-l"></div>
                        </>
                    )}
                    <Link to={pathname} className={tree?.length ? "text-muted-foreground" : ""}>
                        {title}
                    </Link>
                    <div className={"flex space-x-1"}>
                        {tree?.map((item, i, arr) =>
                            item.pathname ? (
                                <Link key={i} to={item.pathname} className={i < arr.length - 1 ? "text-muted-foreground" : ""}>
                                    / {item.label}
                                </Link>
                            ) : (
                                <span key={i} className={i < arr.length - 1 ? "text-muted-foreground" : ""}>
                                    / {item.label}
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
