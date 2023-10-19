import { Page } from "../../components/page";
import { Search } from "../../components/search";
import { SectionHeader } from "../../components/section-header";

export function Teams() {
    return (
        <Page
            pathname="/"
            header={
                <SectionHeader title={`Teams`} pathname="/teams">
                    <Search />
                </SectionHeader>
            }
        >
            <div className="flex justify-center items-center h-[500px]">
                T E A M S
            </div>
        </Page>
    );
}
