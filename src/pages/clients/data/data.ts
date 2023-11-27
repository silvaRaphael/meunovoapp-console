import { faker } from "@faker-js/faker";
import { Client } from "./client";
import { User } from "config/user";

export const clients: Client[] = Array.from(new Array(5)).map(() => {
    const manager = {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        role: "client",
        avatar: faker.internet.avatar(),
    };

    return {
        id: faker.string.uuid(),
        company: faker.company.name(),
        email: faker.internet.email(),
        logotipo: faker.internet.avatar(),
        manager: manager as User,
        users: [manager.id],
    };
});
