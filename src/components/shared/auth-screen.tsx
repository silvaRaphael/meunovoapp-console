import { Logo } from "components/shared/logo";
import { ReactNode } from "react";
import { ThemeToggle } from "components/shared/theme-toggle";
import { LanguageToggle } from "components/shared/language-toggle";
import { Link } from "react-router-dom";
import { cn } from "lib/utils";

export function AuthScreen({
    quote,
    className,
    children,
}: {
    quote?: string;
    className?: string;
    children?: ReactNode;
}) {
    return (
        <div className="container relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="flex absolute right-4 top-4 md:right-8 md:top-8 gap-1">
                <LanguageToggle noRedirect />
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
                        {quote && <p className="text-lg">&ldquo;{quote}&rdquo;</p>}
                    </blockquote>
                </div>
            </div>
            <div className="p-0 sm:p-8">
                <div className={cn("mx-auto flex w-full flex-col justify-center space-y-5 sm:w-[350px]", className)}>
                    {children}
                </div>
            </div>
        </div>
    );
}
