import { MainSideBar } from "../components/main-side-bar";
import { Topbar } from "../components/topbar";

export function Home() {
  return (
    <div>
      {/* <Topbar /> */}
      <div className="bg-background">
        <div className="grid lg:grid-cols-5">
          <MainSideBar />
        </div>
      </div>
    </div>
  );
}
