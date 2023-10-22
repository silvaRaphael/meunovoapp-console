import { Book, Calendar, ClipboardList, LayoutDashboard, ListTodo, Settings, User, Users, Video } from "lucide-react";
import { Role } from "./roles";
import { user } from "./user";

export interface MenuItem {
    path: string;
    label: string;
    icon?: any;
}

export interface SideBarMenu {
    title?: string;
    menu: MenuItem[];
}

export interface SideBarMenuRole {
    role: Role[];
    menu: SideBarMenu[];
}

export const sideMenu2: SideBarMenuRole[] = [
    {
        role: ["owner", "admin"],
        menu: [
            {
                title: "Main menu",
                menu: [
                    {
                        label: "Dashboard",
                        path: "/",
                        icon: <LayoutDashboard className="mr-1" size={14} />,
                    },
                    {
                        label: "Members",
                        path: "/members",
                        icon: <User className="mr-1" size={14} />,
                    },
                ],
            },
            {
                title: "Workflow",
                menu: [
                    {
                        label: "Teams",
                        path: "/teams",
                        icon: <Users className="mr-1" size={14} />,
                    },
                    {
                        label: "Projects",
                        path: "/projects",
                        icon: <ClipboardList className="mr-1" size={14} />,
                    },
                    {
                        label: "Tasks",
                        path: "/tasks",
                        icon: <ListTodo className="mr-1" size={14} />,
                    },
                    {
                        label: "Schedule",
                        path: "/schedule",
                        icon: <Calendar className="mr-1" size={14} />,
                    },
                    {
                        label: "Meetings",
                        path: "/meetings",
                        icon: <Video className="mr-1" size={14} />,
                    },
                ],
            },
            {
                title: "Personal",
                menu: [
                    {
                        label: "Notes",
                        path: "/notes",
                        icon: <Book className="mr-1" size={14} />,
                    },
                    {
                        label: "To Do's",
                        path: "/to-do",
                        icon: <ListTodo className="mr-1" size={14} />,
                    },
                    {
                        label: "Profile",
                        path: "/profile",
                        icon: <User className="mr-1" size={14} />,
                    },
                    {
                        label: "Settings",
                        path: "/settings",
                        icon: <Settings className="mr-1" size={14} />,
                    },
                ],
            },
        ],
    },
    {
        role: ["manager"],
        menu: [
            {
                title: "Main menu",
                menu: [
                    {
                        label: "Dashboard",
                        path: "/",
                        icon: <LayoutDashboard className="mr-1" size={14} />,
                    },
                    {
                        label: "Members",
                        path: "/members",
                        icon: <User className="mr-1" size={14} />,
                    },
                ],
            },
            {
                title: "Workflow",
                menu: [
                    {
                        label: "Teams",
                        path: "/teams",
                        icon: <Users className="mr-1" size={14} />,
                    },
                    {
                        label: "Projects",
                        path: "/projects",
                        icon: <ClipboardList className="mr-1" size={14} />,
                    },
                    {
                        label: "Tasks",
                        path: "/tasks",
                        icon: <ListTodo className="mr-1" size={14} />,
                    },
                    {
                        label: "Schedule",
                        path: "/schedule",
                        icon: <Calendar className="mr-1" size={14} />,
                    },
                    {
                        label: "Meetings",
                        path: "/meetings",
                        icon: <Video className="mr-1" size={14} />,
                    },
                ],
            },
            {
                title: "Personal",
                menu: [
                    {
                        label: "Notes",
                        path: "/notes",
                        icon: <Book className="mr-1" size={14} />,
                    },
                    {
                        label: "To Do's",
                        path: "/to-do",
                        icon: <ListTodo className="mr-1" size={14} />,
                    },
                    {
                        label: "Profile",
                        path: "/profile",
                        icon: <User className="mr-1" size={14} />,
                    },
                    {
                        label: "Settings",
                        path: "/settings",
                        icon: <Settings className="mr-1" size={14} />,
                    },
                ],
            },
        ],
    },
    {
        role: ["member"],
        menu: [
            {
                title: "Main menu",
                menu: [
                    {
                        label: "Dashboard",
                        path: "/",
                        icon: <LayoutDashboard className="mr-1" size={14} />,
                    },
                ],
            },
            {
                title: "Workflow",
                menu: [
                    {
                        label: "Teams",
                        path: "/teams",
                        icon: <Users className="mr-1" size={14} />,
                    },
                    {
                        label: "Projects",
                        path: "/projects",
                        icon: <ClipboardList className="mr-1" size={14} />,
                    },
                    {
                        label: "Tasks",
                        path: "/tasks",
                        icon: <ListTodo className="mr-1" size={14} />,
                    },
                    {
                        label: "Schedule",
                        path: "/schedule",
                        icon: <Calendar className="mr-1" size={14} />,
                    },
                    {
                        label: "Meetings",
                        path: "/meetings",
                        icon: <Video className="mr-1" size={14} />,
                    },
                ],
            },
            {
                title: "Personal",
                menu: [
                    {
                        label: "Notes",
                        path: "/notes",
                        icon: <Book className="mr-1" size={14} />,
                    },
                    {
                        label: "To Do's",
                        path: "/to-do",
                        icon: <ListTodo className="mr-1" size={14} />,
                    },
                    {
                        label: "Profile",
                        path: "/profile",
                        icon: <User className="mr-1" size={14} />,
                    },
                    {
                        label: "Settings",
                        path: "/settings",
                        icon: <Settings className="mr-1" size={14} />,
                    },
                ],
            },
        ],
    },
];

export const sideMenu: SideBarMenu[] = [
    {
        title: "Main menu",
        menu: [
            {
                label: "Dashboard",
                path: "/",
                icon: <LayoutDashboard className="mr-1" size={14} />,
            },
            {
                label: "Members",
                path: "/members",
                icon: <User className="mr-1" size={14} />,
            },
            {
                label: "Teams",
                path: "/teams",
                icon: <Users className="mr-1" size={14} />,
            },
        ],
    },
    {
        title: "Workflow",
        menu: [
            {
                label: "Projects",
                path: "/projects",
                icon: <ClipboardList className="mr-1" size={14} />,
            },
            {
                label: "Tasks",
                path: "/tasks",
                icon: <ListTodo className="mr-1" size={14} />,
            },
            {
                label: "Schedule",
                path: "/schedule",
                icon: <Calendar className="mr-1" size={14} />,
            },
            {
                label: "Meetings",
                path: "/meetings",
                icon: <Video className="mr-1" size={14} />,
            },
        ],
    },
    {
        title: "Personal",
        menu: [
            {
                label: "Notes",
                path: "/notes",
                icon: <Book className="mr-1" size={14} />,
            },
            {
                label: "To Do's",
                path: "/to-do",
                icon: <ListTodo className="mr-1" size={14} />,
            },
            {
                label: "Profile",
                path: "/profile",
                icon: <User className="mr-1" size={14} />,
            },
            {
                label: "Settings",
                path: "/settings",
                icon: <Settings className="mr-1" size={14} />,
            },
        ],
    },
];

export let menuItems: MenuItem[] = [];
for (const item of sideMenu2) {
    if (!item.role.includes(user.role)) continue;
    for (const subItem of item.menu) {
        menuItems.push(...subItem.menu);
    }
}
