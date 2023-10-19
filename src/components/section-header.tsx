import { Link } from "react-router-dom";
import { ReactNode } from "react";

export function SectionHeader({
    title,
    pathname,
    tree,
    children,
}: {
    title: string;
    pathname: string;
    tree?: { label: string; pathname?: string }[];
    children?: ReactNode;
}) {
    return (
        <div className="border-b bg-gray-50">
            <div className="flex h-12 items-center px-4">
                <div className="text-sm font-medium flex space-x-2">
                    <Link to={pathname}>{title}</Link>
                    <div className="flex space-x-1">
                        {tree?.map((item, i) =>
                            item.pathname ? (
                                <Link key={i} to={item.pathname}>
                                    / {item.label}
                                </Link>
                            ) : (
                                <span key={i}>/ {item.label}</span>
                            ),
                        )}
                    </div>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
