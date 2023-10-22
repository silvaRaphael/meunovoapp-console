import { faker } from "@faker-js/faker";
import { Member } from "./member";
import { JobTitle } from "./job-title";
import { Team } from "./team";
import { roles } from "../config/roles";

export const jobTitles: JobTitle[] = Array.from(new Array(5)).map(() => {
    const item = {
        id: faker.string.uuid(),
        name: faker.person.jobType(),
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

export const teams: Team[] = Array.from(new Array(5)).map(() => {
    const memberStartIndex = faker.number.int({ min: 0, max: members.length - 5 });
    const item = {
        id: faker.string.uuid(),
        name: faker.person.jobArea(),
        description: faker.person.bio(),
        manager: members[faker.number.int({ min: 0, max: members.length - 1 })],
        members: members.slice(memberStartIndex, memberStartIndex + faker.number.int({ min: 3, max: 8 })),
        since: faker.date.past(),
    };
    return {
        ...item,
        slug: item.name
            .toLowerCase()
            .replace("ç", "c")
            .replace(/[^a-zA-Z0-9]/gi, ""),
    };
});
