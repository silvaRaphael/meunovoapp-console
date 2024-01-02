import { Section } from "components/shared/section";
import { LoginInForm } from "./form";
import { Logo } from "components/shared/logo";
import { SendResetPasswordForm } from "./reset-password-form";
import { useState } from "react";

export function Login() {
    document.title = "Login - Console | MeuNovoApp";

    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="flex min-h-screen items-center w-full">
            <Section size="tiny" className="space-y-6">
                <div className="space-y-10">
                    <div className="space-y-3 w-full">
                        <Logo className="justify-center" />
                        <h4 className="text-muted-foreground leading-5 text-center mx-auto">Acessar o console</h4>
                    </div>
                    <LoginInForm />
                </div>
                <div className="flex justify-end">
                    <SendResetPasswordForm open={open} setOpen={setOpen} />
                </div>
            </Section>
        </div>
    );
}
