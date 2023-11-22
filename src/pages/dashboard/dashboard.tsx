import { Page } from "../../components/shared/page";
import { Search } from "../../components/shared/search";
import { SectionHeader } from "../../components/shared/section-header";

export function Dashboard() {
    return (
        <Page
            pathname="/"
            header={
                <SectionHeader title={`Dashboard`} pathname="/">
                    <Search />
                </SectionHeader>
            }
        >
            <div className="flex justify-center items-center h-[500px]">D A S H B O A R D</div>
        </Page>
    );
}
