import { ClipboardList, HelpCircle, LayoutDashboard, ListTodo, Mail, Settings2, User, Users } from "lucide-react";
import { Role } from "./roles";
import { ReactNode } from "react";
import { Auth } from "components/shared/auth-provider";

export interface MenuItem {
    path: string;
    label: string;
    icon?: any;
    subMenuItem?: MenuItem;
}

export interface SideBarMenu {
    title?: string;
    menu: MenuItem[];
}

export interface SideBarMenuRole {
    role: Role[];
    menu: SideBarMenu[];
}

export const SideMenu = ({ writeLang }: { writeLang: (texts: [string, React.ReactNode][]) => ReactNode }): SideBarMenuRole[] => {
    return [
        {
            role: ["master"],
            menu: [
                {
                    menu: [
                        {
                            label: "Console",
                            path: "/",
                            icon: <LayoutDashboard className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang([
                                ["en", "Emails"],
                                ["pt", "E-mails"],
                            ]) as string,
                            path: "/emails",
                            icon: <Mail className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang([
                                ["en", "Clients"],
                                ["pt", "Clientes"],
                            ]) as string,
                            path: writeLang([
                                ["en", "/clients"],
                                ["pt", "/clientes"],
                            ]) as string,
                            icon: <Users className="mr-1" size={14} />,
                        },
                    ],
                },
                {
                    title: writeLang([
                        ["en", "Project"],
                        ["pt", "Projeto"],
                    ]) as string,
                    menu: [
                        {
                            label: writeLang([
                                ["en", "Projects"],
                                ["pt", "Projetos"],
                            ]) as string,
                            path: writeLang([
                                ["en", "/projects"],
                                ["pt", "/projetos"],
                            ]) as string,
                            icon: <ClipboardList className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang([
                                ["en", "Tasks"],
                                ["pt", "Tarefas"],
                            ]) as string,
                            path: writeLang([
                                ["en", "/tasks"],
                                ["pt", "/tarefas"],
                            ]) as string,
                            icon: <ListTodo className="mr-1" size={14} />,
                        },
                        // {
                        //     label: writeLang([
                        //         ["en", "Schedule"],
                        //         ["pt", "Calendário"],
                        //     ]) as string,
                        //     path: writeLang([
                        //         ["en", "/schedule"],
                        //         ["pt", "/calendario"],
                        //     ]) as string,
                        //     icon: <Calendar className="mr-1" size={14} />,
                        // },
                    ],
                },
                {
                    title: writeLang([
                        ["en", "Personal"],
                        ["pt", "Pessoal"],
                    ]) as string,
                    menu: [
                        {
                            label: writeLang([
                                ["en", "Profile"],
                                ["pt", "Perfil"],
                            ]) as string,
                            path: writeLang([
                                ["en", "/profile"],
                                ["pt", "/perfil"],
                            ]) as string,
                            icon: <User className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang([
                                ["en", "Preferences"],
                                ["pt", "Preferências"],
                            ]) as string,
                            path: writeLang([
                                ["en", "/preferences"],
                                ["pt", "/preferencias"],
                            ]) as string,
                            icon: <Settings2 className="mr-1" size={14} />,
                        },
                    ],
                },
                {
                    title: writeLang([
                        ["en", "Help"],
                        ["pt", "Ajuda"],
                    ]) as string,
                    menu: [
                        {
                            label: writeLang([
                                ["en", "Support"],
                                ["pt", "Suporte"],
                            ]) as string,
                            path: writeLang([
                                ["en", "/support"],
                                ["pt", "/suporte"],
                            ]) as string,
                            icon: <HelpCircle className="mr-1" size={14} />,
                        },
                    ],
                },
            ],
        },
        {
            role: ["admin", "client"],
            menu: [
                {
                    menu: [
                        {
                            label: "Console",
                            path: "/",
                            icon: <LayoutDashboard className="mr-1" size={14} />,
                        },
                    ],
                },
                {
                    title: writeLang([
                        ["en", "Project"],
                        ["pt", "Projeto"],
                    ]) as string,
                    menu: [
                        {
                            label: writeLang([
                                ["en", "Projects"],
                                ["pt", "Projetos"],
                            ]) as string,
                            path: writeLang([
                                ["en", "/projects"],
                                ["pt", "/projetos"],
                            ]) as string,
                            icon: <ClipboardList className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang([
                                ["en", "Tasks"],
                                ["pt", "Tarefas"],
                            ]) as string,
                            path: writeLang([
                                ["en", "/tasks"],
                                ["pt", "/tarefas"],
                            ]) as string,
                            icon: <ListTodo className="mr-1" size={14} />,
                        },
                        // {
                        //     label: writeLang([
                        //         ["en", "Schedule"],
                        //         ["pt", "Calendário"],
                        //     ]) as string,
                        //     path: writeLang([
                        //         ["en", "/schedule"],
                        //         ["pt", "/calendario"],
                        //     ]) as string,
                        //     icon: <Calendar className="mr-1" size={14} />,
                        // },
                    ],
                },
                {
                    title: writeLang([
                        ["en", "Personal"],
                        ["pt", "Pessoal"],
                    ]) as string,
                    menu: [
                        {
                            label: writeLang([
                                ["en", "Profile"],
                                ["pt", "Perfil"],
                            ]) as string,
                            path: writeLang([
                                ["en", "/profile"],
                                ["pt", "/perfil"],
                            ]) as string,
                            icon: <User className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang([
                                ["en", "Preferences"],
                                ["pt", "Preferências"],
                            ]) as string,
                            path: writeLang([
                                ["en", "/preferences"],
                                ["pt", "/preferencias"],
                            ]) as string,
                            icon: <Settings2 className="mr-1" size={14} />,
                        },
                    ],
                },
                {
                    title: writeLang([
                        ["en", "Help"],
                        ["pt", "Ajuda"],
                    ]) as string,
                    menu: [
                        {
                            label: writeLang([
                                ["en", "Support"],
                                ["pt", "Suporte"],
                            ]) as string,
                            path: writeLang([
                                ["en", "/support"],
                                ["pt", "/suporte"],
                            ]) as string,
                            icon: <HelpCircle className="mr-1" size={14} />,
                        },
                    ],
                },
            ],
        },
    ];
};

export const MenuItems = ({ auth, writeLang }: { auth: Auth; writeLang: (texts: [string, React.ReactNode][]) => ReactNode }): MenuItem[] => {
    let menuItems: MenuItem[] = [];

    for (const item of SideMenu({ writeLang })) {
        if (!item.role.includes(auth?.role)) continue;
        for (const subItem of item.menu) {
            menuItems.push(...subItem.menu);
        }
    }

    return menuItems;
};
