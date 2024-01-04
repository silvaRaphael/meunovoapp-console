import { ReactElement, ReactNode } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

interface Props {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    triggerButton?: ReactElement;
    title: string;
    description?: string;
    children?: ReactNode;
    confirmButton?: ReactElement;
    hideCloseButton?: boolean;
}

export function ContentAlert({
    open,
    onOpenChange,
    triggerButton,
    title,
    description,
    children,
    confirmButton,
    hideCloseButton,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{triggerButton}</DialogTrigger>
            <DialogContent className="max-w-[90%] sm:max-w-[425px] space-y-1">
                <DialogHeader className="space-y-3">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="text-black/75 dark:text-white/75">{description}</DialogDescription>
                </DialogHeader>
                {children}
                {!hideCloseButton && !!confirmButton && (
                    <DialogFooter>
                        {!hideCloseButton && (
                            <DialogClose asChild>
                                <Button variant="secondary">Close</Button>
                            </DialogClose>
                        )}
                        {confirmButton}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
