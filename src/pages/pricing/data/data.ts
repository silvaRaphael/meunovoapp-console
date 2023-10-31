import { Plan } from "./plan";

export const plans: Plan[] = [
    {
        id: "123",
        title: "Minimal",
        description: "You can have a maximum of 20 active members",
        minPrice: 25,
        minMembers: 20,
        groupMembers: 0,
        pricePerExtraGroupMembers: 0,
        createdAt: new Date(),
    },
    {
        id: "abc",
        title: "Modular",
        description: "You can have 20 members and add more groups of 5 members each",
        minPrice: 25,
        minMembers: 20,
        groupMembers: 5,
        pricePerExtraGroupMembers: 5,
        createdAt: new Date(),
    },
];
