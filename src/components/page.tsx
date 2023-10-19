import { ReactElement, ReactNode } from "react";
import { SectionHeader } from "./section-header";
import { Topbar } from "./topbar";

interface Props {
    pathname: string;
    header: ReactElement<typeof SectionHeader>;
    children?: ReactNode;
}

export function Page({ pathname, header, children }: Props) {
    return (
        <div>
            <Topbar pathname={pathname} />
            {header}
            <div className="bg-background">
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
