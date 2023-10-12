import { MainSideBar } from "../components/main-side-bar";
import { Topbar } from "../components/topbar";

export function Home() {
  return (
    <div>
      <Topbar pathname="/" />
      {/* <div className="bg-background">
        <div className="grid grid-cols-6">
          <MainSideBar pathname="/" />
        </div>
      </div> */}
    </div>
  );
}
