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
    const [isOpen, setIsOpen] = useState<boolean>(localStorage.getItem("side-bar-is-open") === "true");

    function toggleSideBar() {
        localStorage.setItem("side-bar-is-open", String(!isOpen));
        setIsOpen(!isOpen);
    }

    return (
        <>
            <TopBar pathname={pathname} isOpen={isOpen} toggleSideBar={toggleSideBar} />
            <div>
                <div className="flex pb-20">
                    <SideBar pathname={pathname} isOpen={isOpen} />
                    <div
                        className="w-full h-screen mx-auto max-w-7xl"
                        style={{
                            paddingLeft: isOpen ? sideBarWidth : sideBarWidthCollapsed,
                        }}
                    >
                        {header}
                        <div className="p-4 h-full">{children}</div>
                    </div>
                </div>
                <div className="flex items-center justify-end w-full border-t h-10 mt-20 pe-4">
                    <p className="text-xs text-muted-foreground">
                        {new Date().getFullYear()} &copy;{" "}
                        <a href="//meunovoapp.com.br" target="_blank" rel="noreferrer">
                            MeuNovoApp
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
