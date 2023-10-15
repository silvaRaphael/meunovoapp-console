import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";

const ButtonStruct = ({
    onClick,
    to,
    children,
}: {
    onClick?: () => void;
    to?: string;
    children: ReactNode;
}) => (
    <Button size="icon" variant="ghost" className="cursor-pointer" asChild>
        {to ? (
            <Link to={to}>{children}</Link>
        ) : (
            <div onClick={onClick}>{children}</div>
        )}
    </Button>
);

export const actions = {
    Edit: ({ onClick, to }: { onClick?: () => void; to?: string }) => (
        <ButtonStruct to={to} onClick={onClick}>
            <Pencil size={16} />
        </ButtonStruct>
    ),
    Delete: ({ onClick, to }: { onClick?: () => void; to?: string }) => (
        <ButtonStruct to={to} onClick={onClick}>
            <Trash2 size={16} />
        </ButtonStruct>
    ),
};
