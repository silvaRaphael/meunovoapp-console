import { ReactElement, ReactNode, useState } from "react";
import { SectionHeader } from "./section-header";
import { SideBar, sideBarWidth, sideBarWidthCollapsed } from "./side-bar";
import { TopBar } from "./top-bar";
import { Section } from "./section";

interface Props {
  pathname: string;
  header?: ReactElement<typeof SectionHeader>;
  children?: ReactNode;
}

export function Page({ pathname, header, children }: Props) {
  const [isClose, setIsClose] = useState<boolean>(localStorage.getItem("side-bar-is-close") === "true");

  function toggleSideBar() {
    localStorage.setItem("side-bar-is-close", String(!isClose));
    setIsClose(!isClose);
  }

  return (
    <>
      <TopBar pathname={pathname} isOpen={!isClose} toggleSideBar={toggleSideBar} />
      <div>
        <div className="flex">
          <SideBar pathname={pathname} isOpen={!isClose} />
          <Section
            className="min-h-[calc(100vh-88px)] h-full flex flex-col"
            style={{
              paddingLeft: !isClose ? sideBarWidth : sideBarWidthCollapsed,
            }}
          >
            <div className="flex flex-grow-0">{header}</div>
            <div className="p-4 h-full flex flex-col flex-1">{children}</div>
          </Section>
        </div>
        <div className="flex items-center justify-end w-full border-t h-10 pe-4">
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
