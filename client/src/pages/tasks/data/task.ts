import { Member } from "../../members/data/member";
import { Priority } from "../../projects/data/priority";
import { Project } from "../../projects/data/project";
import { Status } from "../../projects/data/status";

export interface Task {
    id: string;
    title: string;
    description: string;
    project: Project;
    member: Member;
    priority: Priority;
    status: Status;
    due: Date;
}
