import { faker } from "@faker-js/faker";
import { Team } from "./team";
import { members } from "../../members/data/data";

export const teams: Team[] = Array.from(new Array(10)).map(() => {
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
