import { LoginInForm } from "./form";
import { Logo } from "components/shared/logo";
import { SendResetPasswordForm } from "./reset-password-form";
import { useState } from "react";
import { ThemeToggle } from "components/shared/theme-toggle";
import { useLanguage } from "components/shared/language-provider";
import { LanguageToggle } from "components/shared/language-toggle";
import { Link } from "react-router-dom";

export function Login() {
    document.title = "Login - Console | MeuNovoApp";

    const { writeLang } = useLanguage();

    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="container relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="flex absolute right-4 top-4 md:right-8 md:top-8 gap-1">
                <LanguageToggle />
                <ThemeToggle />
            </div>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div
                    className="absolute inset-0"
                    style={{
                        background: "url('/images/ocean.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "bottom center",
                        filter: "grayscale(.75)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "url('/images/mask.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "left",
                        filter: "grayscale(.75)",
                        opacity: 0.6,
                    }}
                />
                <div className="absolute inset-0 bg-zinc-900/80" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link to="/login">
                        <Logo scale={0.8} />
                    </Link>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Oferecemos soluções de desenvolvimento de aplicativos sob medida para atender às
                            necessidades exclusivas do seu negócio.&rdquo;
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="p-0 sm:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-5 sm:w-[350px]">
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
                </div>
            </div>
        </div>
    );
}
