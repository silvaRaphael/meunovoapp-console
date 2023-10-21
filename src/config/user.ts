import { Role, roles } from "./roles";

export interface User {
    username: string;
    name: string;
    lastName: string;
    email: string;
    genre?: "feminine" | "masculine";
    avatar?: string;
    role: Role;
}

export const user: User = {
    username: "rsilva",
    name: "raphael",
    lastName: "silva",
    email: "rsilva@email.com",
    genre: "masculine",
    avatar: "https://ui.shadcn.com/avatars/02.png",
    role: roles[0],
};
