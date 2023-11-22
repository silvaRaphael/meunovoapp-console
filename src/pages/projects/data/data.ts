import { faker } from "@faker-js/faker";
import { Project } from "./project";
import { members } from "../../members/data/data";
import { teams } from "../../teams/data/data";
import { statuses } from "./status";
import { Priority, priorities } from "./priority";
import { addDays } from "date-fns";
// import { tasks } from "../../tasks/data/data";

export const projects: Project[] = Array.from(new Array(20)).map(() => {
    const teamStartIndex = faker.number.int({ min: 0, max: teams.length - 3 });
    // const taskStartIndex = faker.number.int({ min: 0, max: tasks.length - 4 });
    const item: Project = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(5),
        description: faker.lorem.paragraphs({ min: 1, max: 2 }),
        manager: members[faker.number.int({ min: 0, max: members.length - 1 })],
        teams: teams.slice(teamStartIndex, teamStartIndex + faker.number.int({ min: 1, max: 3 })),
        // tasks: tasks.slice(taskStartIndex, taskStartIndex + faker.number.int({ min: 1, max: 4 })),
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
