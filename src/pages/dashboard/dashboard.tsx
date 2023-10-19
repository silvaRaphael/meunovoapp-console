import { Page } from "../../components/page";
import { Search } from "../../components/search";
import { SectionHeader } from "../../components/section-header";

export function Dashboard() {
    return (
        <>
            <Page
                pathname="/"
                header={
                    <SectionHeader title={`Dashboard`} pathname="/">
                        <Search />
                    </SectionHeader>
                }
            >
                <h1>DASHBOARD</h1>
            </Page>
        </>
    );
}
