import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Eye, Pencil, Trash2, X } from "lucide-react";
import { cn } from "../../lib/utils";

const ButtonStruct = ({
    onClick,
    to,
    className,
    children,
}: {
    onClick?: () => void;
    to?: string;
    className?: string;
    children: ReactNode;
}) => {
    return (
        <Button size="icon" variant="ghost" className={cn("cursor-pointer", className)} asChild>
            {to ? <Link to={to}>{children}</Link> : <div onClick={onClick}>{children}</div>}
        </Button>
    );
};

export const Actions = {
    See: ({ onClick, to, className }: { onClick?: () => void; to?: string; className?: string }) => (
        <ButtonStruct to={to} onClick={onClick} className={className}>
            <Eye size={16} />
        </ButtonStruct>
    ),
    Edit: ({ onClick, to, className }: { onClick?: () => void; to?: string; className?: string }) => (
        <ButtonStruct to={to} onClick={onClick} className={className}>
            <Pencil size={16} />
        </ButtonStruct>
    ),
    Delete: ({ onClick, to, className }: { onClick?: () => void; to?: string; className?: string }) => (
        <ButtonStruct to={to} onClick={onClick} className={className}>
            <Trash2 size={16} />
        </ButtonStruct>
    ),
    Remove: ({ onClick, to, className }: { onClick?: () => void; to?: string; className?: string }) => (
        <ButtonStruct to={to} onClick={onClick} className={className}>
            <X size={16} />
        </ButtonStruct>
    ),
};
