import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";

export function Topbar({ pathname }: { pathname: string }) {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="pe-2">
            <a href="/" className="text-sm font-medium">
              MODULAR
            </a>
          </div>
          <MainNav pathname={pathname} />
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <UserNav />
          </div>
        </div>
      </div>
    </>
  );
}
