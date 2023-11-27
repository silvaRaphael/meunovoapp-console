import { faker } from "@faker-js/faker";
import { Project } from "./project";
import { clients } from "../../clients/data/data";
import { statuses } from "./status";
import { Priority, priorities } from "./priority";
import { addDays } from "date-fns";

export const projects: Project[] = Array.from(new Array(20)).map(() => {
    const item: Project = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(5),
        description: faker.lorem.paragraphs({ min: 1, max: 2 }),
        manager: clients[faker.number.int({ min: 0, max: clients.length - 1 })],
        priority: faker.number.int({ min: 0, max: priorities.length - 1 }) as Priority,
        status: statuses[faker.number.int({ min: 0, max: statuses.length - 1 })],
        start: new Date(),
        due: faker.date.anytime(),
    };
    return {
        ...item,
        start: addDays(item.due, -60),
    };
});
