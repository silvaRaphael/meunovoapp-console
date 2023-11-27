import { Role } from "./roles";

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: Role;
}

export const user: User = {
    id: "f435a726-cc85-4fa9-b62b-bdcf48befdf1",
    name: "raphael silva",
    email: "rsilva@email.com",
    // avatar: "https://ui.shadcn.com/avatars/02.png",
    role: "admin",
    // role: "client",
};
