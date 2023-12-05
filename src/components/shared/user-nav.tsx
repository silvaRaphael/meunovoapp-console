import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useLanguage } from "./language-provider";
import { useAuth } from "./auth-provider";
import { BASE_FILES } from "config/constants";

export function UserNav() {
    const { auth, removeAuth } = useAuth();
    const { writeLang } = useLanguage();

    const nameSplitted = auth?.name.split(" ") ?? "";
    const userInitials = [nameSplitted[0][0], nameSplitted.length === 1 ? nameSplitted[0][nameSplitted[0].length - 1] : nameSplitted[nameSplitted.length - 1][0]]
        .join("")
        .toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={`${BASE_FILES}/${auth?.avatar}`} alt={`${auth?.name}`} className="object-cover" />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{auth?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{auth?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link
                            to={
                                writeLang([
                                    ["en", "/profile"],
                                    ["pt", "/perfil"],
                                ]) as string
                            }
                        >
                            {writeLang([
                                ["en", "Profile"],
                                ["pt", "Perfil"],
                            ])}
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link
                            to={
                                writeLang([
                                    ["en", "/preferences"],
                                    ["pt", "/preferencias"],
                                ]) as string
                            }
                        >
                            {writeLang([
                                ["en", "Preferences"],
                                ["pt", "Preferências"],
                            ])}
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" asChild>
                    <span onClick={removeAuth}>
                        {writeLang([
                            ["en", "Log out"],
                            ["pt", "Sair"],
                        ])}
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
