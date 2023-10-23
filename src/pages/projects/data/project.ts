import { Member } from "../../members/data/member";
// import { Task } from "../../tasks/data/task";
import { Team } from "../../teams/data/team";
import { Priority } from "./priority";
import { Status } from "./status";

export interface Project {
    id: string;
    title: string;
    description: string;
    manager: Member;
    teams: Team[];
    // tasks: Task[];
    priority: Priority;
    status: Status;
    due: Date;
}
