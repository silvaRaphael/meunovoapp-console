import { UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";
import { Check, Loader2 } from "lucide-react";

export function SubmitButton({
    label,
    form,
}: {
    label: string;
    form: UseFormReturn<any>;
}) {
    return (
        <Button type="submit">
            {form.formState.isSubmitting ? (
                <Loader2 size={16} className="animate-spin me-1" />
            ) : (
                form.formState.isSubmitSuccessful && (
                    <Check size={16} className="me-1" />
                )
            )}
            {label}
        </Button>
    );
}
