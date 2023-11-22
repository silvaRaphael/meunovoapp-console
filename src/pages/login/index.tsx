import { Section } from "components/shared/section";
import { LoginInForm } from "./form";
import { Logo } from "components/shared/logo";

export function Login() {
    document.title = "Login - Console | MeuNovoApp";

    return (
        <div className="flex min-h-screen items-center w-full">
            <Section size="tiny" className="w-full space-y-10">
                <div className="space-y-3 w-full">
                    <Logo className="mx-auto w-min -translate-x-4" />
                    <h4 className="text-muted-foreground leading-5 text-center mx-auto">Acessar o console</h4>
                </div>
                <LoginInForm />
            </Section>
        </div>
    );
}
