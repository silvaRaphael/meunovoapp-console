import { faker } from "@faker-js/faker";
import fs from "fs";
import { Member } from "../../src/adapters/member";

const members: Member[] = Array.from(new Array(35)).map(() => {
    const item = {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.internet.avatar(),
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

fs.writeFileSync(`${__dirname}/members.json`, JSON.stringify(members));
