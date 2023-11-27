import { Client } from "../../clients/data/client";
import { Priority } from "./priority";
import { Status } from "./status";

export interface Project {
    id: string;
    title: string;
    description: string;
    manager: Client;
    priority: Priority;
    status: Status;
    start: Date;
    due: Date;
}
