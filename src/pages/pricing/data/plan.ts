export interface PlanInclude {
    id: string;
    title: string;
}

export interface PlanItem {
    id: string;
    title: string;
}

export interface Extra {
    title: string;
    ammount: number;
    price: number;
    max: number;
}

export interface Plan {
    id: string;
    title: string;
    description?: string;
    price: number;
    members: number;
    teams: number;
    projects: number;
    daysFree: number;
    extras: Extra[];
    items: string[];
    includes: Pick<PlanInclude, "id">[];
    createdAt: Date;
}
