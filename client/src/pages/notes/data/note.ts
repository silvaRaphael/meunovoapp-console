import { User } from "../../../config/user";

export interface Note {
    id: string;
    member: User;
    title: string;
    description?: string;
    createdAt: Date;
}
