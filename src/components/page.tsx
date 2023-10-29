import { ReactElement, ReactNode, useState } from "react";
import { SectionHeader } from "./section-header";
import { SideBar, sideBarWidth, sideBarWidthCollapsed } from "./side-bar";
import { TopBar } from "./top-bar";

interface Props {
    pathname: string;
    header?: ReactElement<typeof SectionHeader>;
    children?: ReactNode;
}

export function Page({ pathname, header, children }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(() => localStorage.getItem("side-bar-is-open") === "true");

    function toggleSideBar() {
        localStorage.setItem("side-bar-is-open", String(!isOpen));
        setIsOpen(!isOpen);
    }

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
