import { cn } from "lib/utils";
import { buttonVariants } from "../button";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex space-x-4 items-center">
              <span className={cn(buttonVariants({ variant: "outline" }), "p-0 w-9 h-9 pointer-events-none")}>
                <img src="/icons/firework-light.gif" alt="" className="w-9 h-9" />
              </span>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
              {action}
              <ToastClose />
            </div>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
