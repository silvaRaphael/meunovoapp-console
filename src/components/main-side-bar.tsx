import {
  ClipboardList,
  Hash,
  LayoutDashboard,
  ListTodo,
  User,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";

interface SideMenuGroup {
  title: string;
  menu: SideMenu[];
}

interface SideMenu {
  path: string;
  label: string;
  icon?: any;
}

const sideMenu: SideMenuGroup[] = [
  {
    title: "Main Menu",
    menu: [
      {
        label: "Dashboard",
        path: "/",
        icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      },
      {
        label: "Members",
        path: "/members",
        icon: <User className="mr-2 h-4 w-4" />,
      },
      {
        label: "Teams",
        path: "/teams",
        icon: <Users className="mr-2 h-4 w-4" />,
      },
      {
        label: "Projects",
        path: "/projects",
        icon: <ClipboardList className="mr-2 h-4 w-4" />,
      },
      {
        label: "Tasks",
        path: "/tasks",
        icon: <ListTodo className="mr-2 h-4 w-4" />,
      },
    ],
  },
];

export function MainSideBar({ pathname }: { pathname: string }) {
  return (
    <div className="pb-12 border-r">
      <div className="space-y-4 py-4">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Modular
        </h2>
        {sideMenu.map((menu, i) => (
          <div className="px-3 py-2" key={i}>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {menu.title}
            </h2>
            <div className="space-y-1">
              {menu.menu.map((item, i) => (
                <Button
                  variant={pathname === item.path ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  key={i}
                  asChild
                >
                  <a href={item.path}>
                    {item?.icon ?? <Hash className="mr-2 h-4 w-4" />}
                    {item.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
