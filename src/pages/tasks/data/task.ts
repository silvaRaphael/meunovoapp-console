import { Project } from "../../projects/data/project";
import { Status } from "../../projects/data/status";

export interface Task {
    id: string;
    name: string;
    description: string;
    project: Project;
    status: Status;
    startDate?: Date;
    endDate?: Date;
}
