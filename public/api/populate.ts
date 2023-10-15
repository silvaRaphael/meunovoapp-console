import fs from "fs";
import { members, roles } from "../../src/adapters/populate";

fs.writeFileSync(`./public/api/roles.json`, JSON.stringify(roles));
fs.writeFileSync(`./public/api/members.json`, JSON.stringify(members));
