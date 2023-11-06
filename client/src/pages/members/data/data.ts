import { faker } from "@faker-js/faker";
import { Member } from "./member";
import { roles } from "../../../config/roles";
import { jobTitles } from "../../../config/job-titles";

export const members: Member[] = Array.from(new Array(35)).map(() => {
    const item = {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.internet.avatar(),
        jobTitle: jobTitles[faker.number.int({ min: 0, max: jobTitles.length - 1 })],
        role: roles[faker.number.int({ min: 1, max: 3 })],
        bio: faker.person.bio(),
        since: faker.date.past(),
    };
    return {
        ...item,
        username: faker.internet.userName({
            firstName: item.name,
            lastName: item.lastName,
        }),
    };
});
