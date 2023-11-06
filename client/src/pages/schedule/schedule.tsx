import { useEffect, useState } from "react";
import { Page } from "../../components/page";
import { Search } from "../../components/search";
import { SectionHeader } from "../../components/section-header";
import { Button } from "../../components/ui/button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Project } from "../projects/data/project";
import { ContentAlert } from "../../components/content-alert";
import { format } from "date-fns";

export function Schedule() {
    const [date, setDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [dateSelected, setDateSelected] = useState<Date | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectSelected, setProjectSelected] = useState<Project | null>(null);

    function getProjects(date: Date) {
        fetch("/api/projects.json")
            .then((res) => res.json())
            .then((res) => {
                res = res.filter((item: Project) => new Date(item.due) >= date && new Date(item.due) <= new Date(date.getFullYear(), date.getMonth() + 1, 0));
                // .map((item: Project) => {
                //     return {
                //         title: item.title,
                //         date: item.due,
                //         // end: new Date(new Date(item.due).setDate(new Date(item.due).getDate() + 1)),
                //     };
                // });
                setProjects(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getProjects(date);

        return () => {
            controller.abort();
        };
    }, [date]);

    return (
        <Page
            pathname="/schedule"
            header={
                <SectionHeader title={`Schedule`} pathname="/schedule">
                    <Search />
                </SectionHeader>
            }
        >
            {dateSelected && (
                <Button className="fixed bottom-6 right-6 z-10" onClick={() => alert(dateSelected)}>
                    Create
                </Button>
            )}
            <FullCalendar
                plugins={[dayGridPlugin]}
                headerToolbar={{
                    left: "prev",
                    center: "title",
                    right: "next",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={[
                    ...projects.map((item: Project) => {
                        return {
                            id: item.id,
                            title: item.title,
                            // date: item.start,
                            // end: item.due,
                            date: item.due,
                        };
                    }),
                ]}
                datesSet={(date) => setDate(new Date(date.start.getFullYear(), date.start.getMonth() + 1))}
                dateClick={(date) => setDateSelected(date.date)}
                eventContent={(content) => (
                    <Button variant="secondary" size="sm" className="w-full">
                        <span className="truncate">{content.event.title}</span>
                    </Button>
                )}
                eventClick={(date) => setProjectSelected(projects.find((item) => item.id === date.event.id) as Project)}
                eventAdd={() => {}}
                eventChange={() => {}}
                eventRemove={() => {}}
            />
            <ContentAlert open={!!projectSelected} onOpenChange={(open: boolean) => setProjectSelected(open ? projectSelected : null)} title={`${projectSelected?.title}`}>
                <div className="max-h-[70vh] overflow-y-auto vertical-scrollbar space-y-2">
                    {!!projectSelected && (
                        <div className="flex flex-col space-y-4">
                            <div className="flex gap-x-1">
                                <span className="font-medium">Due Date:</span>
                                {format(new Date(projectSelected.due), "PPP")}
                            </div>
                        </div>
                    )}
                </div>
            </ContentAlert>
        </Page>
    );
}
