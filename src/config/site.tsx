import {
    Calendar,
    ClipboardList,
    LayoutDashboard,
    ListTodo,
    Settings,
    User,
    Users,
    Video,
} from "lucide-react";

export interface MenuItem {
    path: string;
    label: string;
    icon?: any;
}

export interface SideBarMenu {
    title?: string;
    menu: MenuItem[];
}

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
        title: "Preferences",
        menu: [
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
for (const item of sideMenu) {
    menuItems.push(...item.menu);
}
