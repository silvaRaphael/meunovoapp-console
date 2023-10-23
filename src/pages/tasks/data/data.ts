import { faker } from "@faker-js/faker";
import { Task } from "./task";
import { members } from "../../members/data/data";
import { statuses } from "../../projects/data/status";
import { Priority, priorities } from "../../projects/data/priority";
import { projects } from "../../projects/data/data";

export const tasks: Task[] = Array.from(new Array(20)).map(() => {
    const item = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(3),
        description: faker.lorem.paragraphs({ min: 1, max: 2 }),
        project: projects[faker.number.int({ min: 0, max: projects.length - 1 })],
        member: members[faker.number.int({ min: 0, max: members.length - 1 })],
        priority: faker.number.int({ min: 0, max: priorities.length - 1 }) as Priority,
        status: statuses[faker.number.int({ min: 0, max: statuses.length - 1 })],
        due: faker.date.past(),
    };
    return item;
});
