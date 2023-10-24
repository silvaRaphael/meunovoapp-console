import { DayPicker } from "react-day-picker";
import { Page } from "../../components/page";
import { Search } from "../../components/search";
import { SectionHeader } from "../../components/section-header";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";

export function Schedule() {
    return (
        <Page
            pathname="/schedule"
            header={
                <SectionHeader title={`Schedule`} pathname="/schedule">
                    <Search />
                    <Button>Create</Button>
                </SectionHeader>
            }
        >
            <Calendar
                mode="single"
                defaultMonth={new Date()}
                className="p-0"
                classNames={{
                    month: "w-full",
                    cell: "w-full h-32 m-2 border rounded-md text-start",
                    head_row: "flex justify-around",
                }}
            />
        </Page>
    );
}
