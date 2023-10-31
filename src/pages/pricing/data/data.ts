import { Plan, PlanInclude, PlanItem } from "./plan";

export const planIncludes: PlanInclude[] = [
    { id: "1", title: "Custom metrics" },
    { id: "2", title: "Members" },
    { id: "3", title: "Unlimited Teams" },
    { id: "4", title: "Unlimited Projects" },
    { id: "5", title: "Unlimited Tasks" },
    { id: "6", title: "Schedules" },
    { id: "7", title: "Meetings" },
    { id: "8", title: "Personal notes & to do's list" },
];

export const planItems: PlanItem[] = [
    { id: "1", title: "Max of 10 members" },
    { id: "2", title: "Max of 20 members" },
    { id: "3", title: "20+ members" },
    { id: "4", title: "Unlimited members" },
    { id: "5", title: "Limited members" },
    { id: "6", title: "Pay as your need" },
    { id: "7", title: "All access" },
    { id: "8", title: "14 days free" },
    { id: "9", title: "30 days free" },
];

export const plans: Plan[] = [
    {
        id: "123",
        title: "Minimal",
        description: `Recommended for starters`,
        price: 15,
        members: 10,
        teams: 5,
        projects: 10,
        daysFree: 14,
        extras: [],
        items: ["10 members", "5 teams", "10 projects", "All features access", "14 days free"],
        includes: [{ id: "1" }, { id: "2" }, { id: "6" }, { id: "7" }, { id: "8" }, { id: "9" }],
        createdAt: new Date(),
    },
    {
        id: "xyz",
        title: "Modular",
        description: "Recommended for scalable, you can add extras to modules",
        price: 30,
        members: 20,
        teams: 10,
        projects: 50,
        daysFree: 14,
        extras: [
            {
                title: "members",
                ammount: 5,
                price: 5,
                max: 150,
            },
            {
                title: "teams",
                ammount: 5,
                price: 5,
                max: 50,
            },
            {
                title: "projects",
                ammount: 5,
                price: 5,
                max: 100,
            },
        ],
        items: ["20+ members", "10+ teams", "50+ projects", "customize for your needs", "all features access", "14 days free"],
        includes: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" }, { id: "9" }],
        createdAt: new Date(),
    },
    {
        id: "abc",
        title: "Full",
        description: "Recommended for companies",
        price: 100,
        members: 100,
        teams: 40,
        projects: 150,
        extras: [],
        daysFree: 14,
        items: ["100 members", "40 teams", "150 projects", "all features access", "14 days free"],
        includes: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" }, { id: "9" }],
        createdAt: new Date(),
    },
];
