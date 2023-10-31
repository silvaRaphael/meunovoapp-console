export interface Plan {
    id: string;
    title: string;
    description?: string;
    minPrice: number;
    minMembers: number;
    groupMembers: number;
    pricePerExtraGroupMembers: number;
    createdAt: Date;
}
