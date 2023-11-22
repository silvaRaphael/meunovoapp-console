import { Hash, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MenuItem, MenuItems } from "../../config/site";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";

export function MainNav({ pathname }: { pathname: string }) {
    const { language, writeLang } = useLanguage();

    const navigate = useNavigate();
    const ref = useRef<HTMLElement>(null);
    const [activeMenu, setActiveMenu] = useState<MenuItem[]>([]);

    function removeActiveMenuItem(item: MenuItem) {
        const _activeMenu = activeMenu.filter((act) => act.path !== item.path);

        localStorage.setItem(`${language.lang}-menu`, JSON.stringify(_activeMenu.map((item) => item.path)));

        if (item.path === pathname) return navigate("/");

        setActiveMenu(_activeMenu);
    }

    function initActiveMenuItems(pathname: string) {
        let activeMenuStoraged = localStorage.getItem(`${language.lang}-menu`);
        let _activeMenu: string[] = ["/"];

        if (activeMenuStoraged) _activeMenu = JSON.parse(activeMenuStoraged);

        let newActiveMenu = [..._activeMenu];
        if (!_activeMenu.find((item) => item === pathname)) newActiveMenu.push(pathname);

        localStorage.setItem(`${language.lang}-menu`, JSON.stringify(newActiveMenu));

        let _newActiveMenu: MenuItem[] = [];
        newActiveMenu.forEach((item) => {
            const _item = MenuItems({ writeLang }).find((menu) => item === menu.path);
            if (_item) _newActiveMenu.push(_item);
        });

        setActiveMenu(_newActiveMenu);
    }

    function updateScrollPosition(event: WheelEvent) {
        event.preventDefault();
        const direction = event.deltaY > 0;
        if (ref.current) ref.current.scrollLeft = ref.current.scrollLeft + (direction ? 5 : -5);
    }

    useEffect(() => {
        initActiveMenuItems(pathname);

        if (ref && ref.current) {
            ref.current.onwheel = updateScrollPosition;
        }

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (ref.current) ref.current.onwheel = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, language]);

    return (
        <nav ref={ref} className="flex items-center flex-grow ps-4 pe-2 space-x-2 overflow-x-auto horizontal-scrollbar">
            {activeMenu.map((item, i) => (
                <Link
                    key={i}
                    to={item.path}
                    className={`flex items-center text-sm font-medium h-11 transition-colors hover:text-primary group ${pathname !== item.path ? "text-muted-foreground" : ""}`}
                >
                    <span className="flex items-center">
                        {item?.icon ?? <Hash className="mr-1" size={14} />}
                        {item.label}
                    </span>
                    {item.path === "/" ? (
                        <div className="w-4"></div>
                    ) : (
                        <span
                            className="p-1 ms-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 invisible group-hover:visible"
                            onClick={(e) => {
                                e.preventDefault();
                                removeActiveMenuItem(item);
                            }}
                        >
                            <X size={12} />
                        </span>
                    )}
                </Link>
            ))}
        </nav>
    );
}
