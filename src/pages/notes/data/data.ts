import { faker } from "@faker-js/faker";
import { Note } from "./note";
import { user } from "../../../config/user";

export const notes: Note[] = Array.from(new Array(10)).map(() => {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(2),
        description: faker.lorem.paragraphs({ min: 1, max: 2 }),
        member: user,
        createdAt: faker.date.past(),
    };
});
