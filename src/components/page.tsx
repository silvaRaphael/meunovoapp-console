import { ReactElement, ReactNode } from "react";
import { SectionHeader } from "./section-header";
import { SideBar, sideBarWidth } from "./side-bar";
import { TopBar } from "./top-bar-new";

interface Props {
    pathname: string;
    header: ReactElement<typeof SectionHeader>;
    children?: ReactNode;
}

export function Page({ pathname, header, children }: Props) {
    return (
        <div className="flex">
            <SideBar pathname={pathname} />
            <div
                className="min-h-screen"
                style={{
                    paddingLeft: sideBarWidth,
                }}
            >
                <TopBar pathname={pathname} />
                {header}
                <div className="bg-background">
                    <div className="p-6">{children}</div>
                </div>
            </div>
        </div>
    );
}
