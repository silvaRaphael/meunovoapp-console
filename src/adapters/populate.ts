import { faker } from "@faker-js/faker";
import { Member } from "./member";
import { Role } from "./roles";

export const roles: Role[] = Array.from(new Array(5)).map(() => {
    const item = {
        id: faker.string.uuid(),
        title: faker.person.jobType(),
    };
    return {
        ...item,
    };
});

export const members: Member[] = Array.from(new Array(35)).map(() => {
    const item = {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.internet.avatar(),
        role: roles[faker.number.int({ min: 0, max: roles.length - 1 })],
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
