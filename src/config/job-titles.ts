import { faker } from "@faker-js/faker";

export interface JobTitle {
    id: string;
    name: string;
}

export const jobTitles: JobTitle[] = Array.from(new Array(5)).map(() => {
    const item = {
        id: faker.string.uuid(),
        name: faker.person.jobType(),
    };
    return {
        ...item,
    };
});
