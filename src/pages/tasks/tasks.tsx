import { Page } from "../../components/page";
import { Search } from "../../components/search";
import { SectionHeader } from "../../components/section-header";

export function Tasks() {
    return (
        <Page
            pathname="/tasks"
            header={
                <SectionHeader title={`Tasks`} pathname="/tasks">
                    <Search />
                </SectionHeader>
            }
        >
            <div className="flex justify-center items-center h-[500px]">
                T A S K S
            </div>
        </Page>
    );
}
