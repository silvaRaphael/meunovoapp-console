import { Page } from "../../components/shared/page";
import { SectionHeader } from "../../components/shared/section-header";

export function Console() {
    return (
        <Page pathname="/" header={<SectionHeader isRoot title={`Console`} pathname="/"></SectionHeader>}>
            <div className="flex justify-center items-center h-[500px]">C O N S O L E</div>
        </Page>
    );
}
