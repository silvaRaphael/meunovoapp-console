import {
  ClipboardList,
  LayoutDashboard,
  ListTodo,
  User,
  Users,
} from "lucide-react";

export interface SideMenu {
  path: string;
  label: string;
  icon?: any;
}

export const sideMenu: SideMenu[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <LayoutDashboard className="mr-1 h-4 w-4" />,
  },
  {
    label: "Members",
    path: "/members",
    icon: <User className="mr-1 h-4 w-4" />,
  },
  {
    label: "Teams",
    path: "/teams",
    icon: <Users className="mr-1 h-4 w-4" />,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: <ClipboardList className="mr-1 h-4 w-4" />,
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: <ListTodo className="mr-1 h-4 w-4" />,
  },
];
