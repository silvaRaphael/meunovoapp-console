import { User } from "config/user";

export interface Client {
    id: string;
    company: string;
    logotipo?: string;
    manager: User;
    users?: string[];
}
