import { ReactElement } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useLanguage } from "./language-provider";

interface Props {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    triggerButton?: ReactElement;
    title: string;
    description?: string;
    confirmButton?: ReactElement;
}

export function ConfirmationAlert({ open, onOpenChange, triggerButton, title, description, confirmButton }: Props) {
    const { writeLang } = useLanguage();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{triggerButton}</DialogTrigger>
            <DialogContent className="max-w-[360px]">
                <DialogHeader>
                    <DialogTitle className="me-5 mb-4">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-2">
                    <DialogClose asChild>
                        <Button variant="secondary">
                            {
                                writeLang([
                                    ["en", "Close"],
                                    ["pt", "Fechar"],
                                ]) as string
                            }
                        </Button>
                    </DialogClose>
                    {confirmButton}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
