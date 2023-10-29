import { Role } from "./roles";

export interface User {
    id: string;
    username: string;
    name: string;
    lastName: string;
    email: string;
    genre?: "feminine" | "masculine";
    avatar?: string;
    role: Role;
}

export const user: User = {
    id: "f435a726-cc85-4fa9-b62b-bdcf48befdf1",
    username: "rsilva",
    name: "raphael",
    lastName: "silva",
    email: "rsilva@email.com",
    genre: "masculine",
    avatar: "https://ui.shadcn.com/avatars/02.png",
    role: "owner",
    // role: "admin",
    // role: "manager",
    // role: "member",
};
