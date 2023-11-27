import { Link } from "react-router-dom";
import { user } from "../../config/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useLanguage } from "./language-provider";
import { useAuth } from "./auth-provider";

export function UserNav() {
    const { removeAuth } = useAuth();
    const { writeLang } = useLanguage();

    const userInitials = [user.name.split(" ")[0][0], user.name.split(" ")[1][0]].join("").toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={`${user?.name}`} />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
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
