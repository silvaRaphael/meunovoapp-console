import { Role } from "./roles";

export interface User {
    id: string;
    name: string;
    email: string;
    is_manager: boolean;
    avatar?: string;
    role: Role;
}
