import { ReactElement } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface Props {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    triggerButton?: ReactElement;
    title: string;
    description?: string;
    confirmButton?: ReactElement;
}

export function ConfirmationAlert({ open, onOpenChange, triggerButton, title, description, confirmButton }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{triggerButton}</DialogTrigger>
            <DialogContent className="max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>
                    {confirmButton}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
