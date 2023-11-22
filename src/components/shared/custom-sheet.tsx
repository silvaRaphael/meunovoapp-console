import { ReactElement, ReactNode } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

interface Props {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    triggerButton?: ReactElement;
    title: string;
    description?: string;
    children?: ReactNode;
    closeButton?: boolean;
    confirmButton?: ReactElement;
}

export function CustomSheet({ open, onOpenChange, triggerButton, title, description, children, closeButton = true, confirmButton }: Props) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>{triggerButton}</SheetTrigger>
            <SheetContent className="max-w-[360px] space-y-8">
                <SheetHeader>
                    <SheetTitle className="me-5">{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>
                {children}
                <SheetFooter>
                    {closeButton && (
                        <SheetClose asChild>
                            <Button variant="ghost">Close</Button>
                        </SheetClose>
                    )}
                    {confirmButton}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
