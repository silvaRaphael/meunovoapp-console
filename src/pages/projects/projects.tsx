import { Page } from "../../components/page";
import { Search } from "../../components/search";
import { SectionHeader } from "../../components/section-header";

export function Projects() {
    return (
        <Page
            pathname="/"
            header={
                <SectionHeader title={`Projects`} pathname="/projects">
                    <Search />
                </SectionHeader>
            }
        >
            <div className="flex justify-center items-center h-[500px]">
                P R O J E C T S
            </div>
        </Page>
    );
}
