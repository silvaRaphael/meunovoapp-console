export interface PlanInclude {
    id: string;
    title: string;
    type?: boolean | string | number;
}

export interface PlanItem {
    id: string;
    title: string;
}

export interface PlanExtra {
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
    extras: PlanExtra[];
    items: string[];
    includes: (Pick<PlanInclude, "id"> & { value: string | number | boolean })[];
    recommended?: boolean;
    createdAt: Date;
}
