import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function AddButton({
    onClick,
    to,
}: {
    onClick?: () => void;
    to?: string;
}) {
    const Content = () => (
        <>
            <Plus size={16} className="me-1 text-white" />
            <span className="text-sm font-medium">Add</span>
        </>
    );

    return (
        <Button size="sm" className="cursor-pointer" asChild>
            {to ? (
                <Link to={to}>
                    <Content />
                </Link>
            ) : (
                <div onClick={onClick}>
                    <Content />
                </div>
            )}
        </Button>
    );
}

export function DeleteButton({
    onClick,
    to,
}: {
    onClick?: () => void;
    to?: string;
}) {
    const Content = () => (
        <>
            <Trash2 size={16} className="me-1 text-white" />
            <span className="text-sm font-medium">Delete</span>
        </>
    );

    return (
        <Button size="sm" className="cursor-pointer" asChild>
            {to ? (
                <Link to={to}>
                    <Content />
                </Link>
            ) : (
                <div onClick={onClick}>
                    <Content />
                </div>
            )}
        </Button>
    );
}
