import { ReactElement, ReactNode, useEffect, useState } from "react";
import { SectionHeader } from "./section-header";
import { SideBar, sideBarWidth, sideBarWidthCollapsed } from "./side-bar";
import { TopBar } from "./top-bar";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "./ui/toast/use-toast";

interface Props {
    pathname: string;
    header: ReactElement<typeof SectionHeader>;
    children?: ReactNode;
}

export function Page({ pathname, header, children }: Props) {
    const location = useLocation();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState<boolean>(() => localStorage.getItem("side-bar-is-open") === "true");

    function showToast() {
        if (location?.state?.toast?.title) {
            toast({
                title: location?.state?.toast?.title,
                description: location?.state?.toast?.description,
            });
            navigate(location.pathname, { replace: true });
        }
    }

    function toggleSideBar() {
        localStorage.setItem("side-bar-is-open", String(!isOpen));
        setIsOpen(!isOpen);
    }

    useEffect(() => showToast());

    return (
        <>
            <TopBar pathname={pathname} isOpen={isOpen} toggleSideBar={toggleSideBar} />
            <div className="flex">
                <SideBar pathname={pathname} isOpen={isOpen} />
                <div
                    className="w-full max-h-screen"
                    style={{
                        paddingLeft: isOpen ? sideBarWidth : sideBarWidthCollapsed,
                    }}
                >
                    {header}
                    <div className="p-4">{children}</div>
                </div>
            </div>
        </>
    );
}
