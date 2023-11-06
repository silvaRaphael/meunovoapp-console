import { faker } from "@faker-js/faker";

export interface Notification {
    id: string;
    title: string;
    subtitle?: string;
    link?: string;
    createdAt: Date;
}

export const notifications: Notification[] = Array.from(new Array(10)).map(
    () => {
        return {
            id: faker.string.uuid(),
            title: faker.lorem.sentence({ min: 2, max: 4 }),
            subtitle: faker.lorem.sentence({ min: 5, max: 8 }),
            link: "/",
            createdAt: faker.date.past(),
        };
    },
);
