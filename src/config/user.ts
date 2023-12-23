import { Client } from "pages/clients/data/client";
import { Role } from "./roles";

export interface User {
    id: string;
    name: string;
    email: string;
    is_manager: boolean;
    avatar?: string;
    role: Role;
    client?: Client;
    invited_at?: Date;
    activated_at?: Date;
}
