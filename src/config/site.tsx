import {
    Building2,
    ClipboardList,
    FileCode,
    LayoutDashboard,
    ListTodo,
    Mail,
    MessageCircle,
    Settings2,
    User,
    Users,
} from "lucide-react";
import { Role } from "./roles";
import { ReactNode } from "react";
import { UserData } from "components/shared/user-data-provider";
import { Langs } from "./languages";

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

export const SideMenu = ({
    writeLang,
    lang,
}: {
    writeLang: (texts: [string, React.ReactNode][], lang?: Langs) => ReactNode;
    lang?: Langs;
}): SideBarMenuRole[] => {
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
                    ],
                },
                {
                    title: writeLang(
                        [
                            ["en", "Management"],
                            ["pt", "Gestão"],
                        ],
                        lang,
                    ) as string,
                    menu: [
                        {
                            label: writeLang(
                                [
                                    ["en", "Clients"],
                                    ["pt", "Clientes"],
                                ],
                                lang,
                            ) as string,
                            path: writeLang(
                                [
                                    ["en", "/clients"],
                                    ["pt", "/clientes"],
                                ],
                                lang,
                            ) as string,
                            icon: <Building2 className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang(
                                [
                                    ["en", "Users"],
                                    ["pt", "Usuários"],
                                ],
                                lang,
                            ) as string,
                            path: writeLang(
                                [
                                    ["en", "/users"],
                                    ["pt", "/usuarios"],
                                ],
                                lang,
                            ) as string,
                            icon: <Users className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang(
                                [
                                    ["en", "Emails"],
                                    ["pt", "E-mails"],
                                ],
                                lang,
                            ) as string,
                            path: "/emails",
                            icon: <Mail className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang(
                                [
                                    ["en", "Templates"],
                                    ["pt", "Modelos"],
                                ],
                                lang,
                            ) as string,
                            path: writeLang(
                                [
                                    ["en", "/templates"],
                                    ["pt", "/modelos"],
                                ],
                                lang,
                            ) as string,
                            icon: <FileCode className="mr-1" size={14} />,
                        },
                    ],
                },
                {
                    title: writeLang(
                        [
                            ["en", "Project"],
                            ["pt", "Projeto"],
                        ],
                        lang,
                    ) as string,
                    menu: [
                        {
                            label: writeLang(
                                [
                                    ["en", "Projects"],
                                    ["pt", "Projetos"],
                                ],
                                lang,
                            ) as string,
                            path: writeLang(
                                [
                                    ["en", "/projects"],
                                    ["pt", "/projetos"],
                                ],
                                lang,
                            ) as string,
                            icon: <ClipboardList className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang(
                                [
                                    ["en", "Tasks"],
                                    ["pt", "Tarefas"],
                                ],
                                lang,
                            ) as string,
                            path: writeLang(
                                [
                                    ["en", "/tasks"],
                                    ["pt", "/tarefas"],
                                ],
                                lang,
                            ) as string,
                            icon: <ListTodo className="mr-1" size={14} />,
                        },
                        // {
                        //     label: writeLang([
                        //         ["en", "Schedule"],
                        //         ["pt", "Calendário"],
                        //     ], lang) as string,
                        //     path: writeLang([
                        //         ["en", "/schedule"],
                        //         ["pt", "/calendario"],
                        //     ], lang) as string,
                        //     icon: <Calendar className="mr-1" size={14} />,
                        // },
                    ],
                },
                {
                    title: writeLang(
                        [
                            ["en", "Personal"],
                            ["pt", "Pessoal"],
                        ],
                        lang,
                    ) as string,
                    menu: [
                        {
                            label: writeLang(
                                [
                                    ["en", "Profile"],
                                    ["pt", "Perfil"],
                                ],
                                lang,
                            ) as string,
                            path: writeLang(
                                [
                                    ["en", "/profile"],
                                    ["pt", "/perfil"],
                                ],
                                lang,
                            ) as string,
                            icon: <User className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang(
                                [
                                    ["en", "Preferences"],
                                    ["pt", "Preferências"],
                                ],
                                lang,
                            ) as string,
                            path: writeLang(
                                [
                                    ["en", "/preferences"],
                                    ["pt", "/preferencias"],
                                ],
                                lang,
                            ) as string,
                            icon: <Settings2 className="mr-1" size={14} />,
                        },
                    ],
                },
                {
                    title: writeLang(
                        [
                            ["en", "Contact"],
                            ["pt", "Contato"],
                        ],
                        lang,
                    ) as string,
                    menu: [
                        {
                            label: "Chat",
                            path: "/chat",
                            icon: <MessageCircle className="mr-1" size={14} />,
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
                    title: writeLang(
                        [
                            ["en", "Project"],
                            ["pt", "Projeto"],
                        ],
                        lang,
                    ) as string,
                    menu: [
                        {
                            label: writeLang(
                                [
                                    ["en", "Projects"],
                                    ["pt", "Projetos"],
                                ],
                                lang,
                            ) as string,
                            path: writeLang(
                                [
                                    ["en", "/projects"],
                                    ["pt", "/projetos"],
                                ],
                                lang,
                            ) as string,
                            icon: <ClipboardList className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang(
                                [
                                    ["en", "Tasks"],
                                    ["pt", "Tarefas"],
                                ],
                                lang,
                            ) as string,
                            path: writeLang(
                                [
                                    ["en", "/tasks"],
                                    ["pt", "/tarefas"],
                                ],
                                lang,
                            ) as string,
                            icon: <ListTodo className="mr-1" size={14} />,
                        },
                        // {
                        //     label: writeLang([
                        //         ["en", "Schedule"],
                        //         ["pt", "Calendário"],
                        //     ], lang) as string,
                        //     path: writeLang([
                        //         ["en", "/schedule"],
                        //         ["pt", "/calendario"],
                        //     ], lang) as string,
                        //     icon: <Calendar className="mr-1" size={14} />,
                        // },
                    ],
                },
                {
                    title: writeLang(
                        [
                            ["en", "Personal"],
                            ["pt", "Pessoal"],
                        ],
                        lang,
                    ) as string,
                    menu: [
                        {
                            label: writeLang(
                                [
                                    ["en", "Profile"],
                                    ["pt", "Perfil"],
                                ],
                                lang,
                            ) as string,
                            path: writeLang(
                                [
                                    ["en", "/profile"],
                                    ["pt", "/perfil"],
                                ],
                                lang,
                            ) as string,
                            icon: <User className="mr-1" size={14} />,
                        },
                        {
                            label: writeLang(
                                [
                                    ["en", "Preferences"],
                                    ["pt", "Preferências"],
                                ],
                                lang,
                            ) as string,
                            path: writeLang(
                                [
                                    ["en", "/preferences"],
                                    ["pt", "/preferencias"],
                                ],
                                lang,
                            ) as string,
                            icon: <Settings2 className="mr-1" size={14} />,
                        },
                    ],
                },
                {
                    title: writeLang(
                        [
                            ["en", "Contact"],
                            ["pt", "Contato"],
                        ],
                        lang,
                    ) as string,
                    menu: [
                        {
                            label: "Chat",
                            path: "/chat",
                            icon: <MessageCircle className="mr-1" size={14} />,
                        },
                    ],
                },
            ],
        },
    ];
};

export const MenuItems = ({
    userData,
    writeLang,
    lang,
}: {
    userData: UserData;
    writeLang: (texts: [string, React.ReactNode][], lang?: Langs) => ReactNode;
    lang?: Langs;
}): MenuItem[] => {
    let menuItems: MenuItem[] = [];

    for (const item of SideMenu({ writeLang, lang })) {
        if (!item.role.includes(userData?.role)) continue;
        for (const subItem of item.menu) {
            menuItems.push(...subItem.menu);
        }
    }

    return menuItems;
};
