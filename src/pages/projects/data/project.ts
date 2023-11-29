import { Client } from "../../clients/data/client";
import { Status } from "./status";

export interface Project {
    id: string;
    name: string;
    description: string;
    client: Client;
    status: Status;
    tasks: any[];
    due: Date;
}
