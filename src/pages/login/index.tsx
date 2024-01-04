import { LoginInForm } from "./form";
import { Logo } from "components/shared/logo";
import { SendResetPasswordForm } from "./reset-password-form";
import { useState } from "react";
import { useLanguage } from "components/shared/language-provider";
import { AuthScreen } from "components/shared/auth-screen";

export function Login() {
    document.title = "Login - Console | MeuNovoApp";

    const { writeLang } = useLanguage();

    const [open, setOpen] = useState<boolean>(false);

    return (
        <AuthScreen
            quote="Oferecemos soluções de desenvolvimento de aplicativos sob medida para atender às
        necessidades exclusivas do seu negócio."
        >
            <div className="flex flex-col space-y-2 mb-2 text-center">
                <Logo className="justify-center" />
                <p className="text-sm text-muted-foreground">
                    {writeLang([
                        ["en", "Enter your email and password to access console"],
                        ["pt", "Digite seu e-mail e senha para acessar o console"],
                    ])}
                </p>
            </div>
            <LoginInForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
                {writeLang([
                    ["en", "If you have forgotten your password, "],
                    ["pt", "Caso tenha esquecido sua senha, "],
                ])}
                <span
                    className="underline underline-offset-4 hover:text-primary cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    {writeLang([
                        ["en", "click here to recover it"],
                        ["pt", "clique aqui para recuperá-la"],
                    ])}
                </span>
                <SendResetPasswordForm label="" open={open} setOpen={setOpen} />.
            </p>
        </AuthScreen>
    );
}
