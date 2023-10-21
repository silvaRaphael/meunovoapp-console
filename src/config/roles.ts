export interface Role {
    id?: string;
    name: string;
    slug: string;
}

export const roles: Role[] = [
    { name: "Admin", slug: "admin" },
    { name: "Manager", slug: "manager" },
    { name: "Member", slug: "member" },
];
