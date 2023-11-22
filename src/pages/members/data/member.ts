import { JobTitle } from "../../../config/job-titles";
import { Role } from "../../../config/roles";

export interface Member {
    id: string;
    username: string;
    email: string;
    name: string;
    lastName: string;
    avatar?: string;
    jobTitle: JobTitle;
    role: Role;
    bio: string;
    since: Date;
}
