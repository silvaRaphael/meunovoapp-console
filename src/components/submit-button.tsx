import { Button } from "./ui/button";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { useState } from "react";

export function SubmitButton({
    type = "button",
    label,
    onSubmit,
    onError,
    onSuccess,
    state = "initial",
}: {
    type?: "button" | "submit";
    label: string;
    onSubmit?: () => Promise<void>;
    onError?: (error: any) => void;
    onSuccess?: () => void;
    state?: "initial" | "loading" | "success" | "error";
}) {
    const [status, setStatus] = useState<"initial" | "loading" | "success" | "error">("initial");

    async function _onSubmit() {
        setStatus("loading");
        try {
            if (onSubmit) await onSubmit();
            if (onSuccess) onSuccess();
            setStatus("success");
        } catch (error: any) {
            if (onError) onError(error);
            setStatus("error");
        }
        setTimeout(() => {
            setStatus("initial");
        }, 3000);
    }

    return (
        <Button type={type} onClick={type === "button" ? _onSubmit : () => null} disabled={status !== "initial" || state !== "initial"}>
            {(status !== "initial" || state !== "initial") &&
                (status === "loading" || state === "loading" ? (
                    <Loader2 size={16} className="animate-spin me-1" />
                ) : status === "success" || state === "success" ? (
                    <Check size={16} className="me-1" />
                ) : (
                    (status === "error" || state === "error") && <AlertCircle size={16} className="me-1" />
                ))}
            {label}
        </Button>
    );
}
