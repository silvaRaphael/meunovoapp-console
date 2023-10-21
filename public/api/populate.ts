import fs from "fs";
import { members, jobTitles, teams } from "../../src/adapters/populate";

fs.writeFileSync(`./public/api/job-titles.json`, JSON.stringify(jobTitles));
fs.writeFileSync(`./public/api/members.json`, JSON.stringify(members));
fs.writeFileSync(`./public/api/teams.json`, JSON.stringify(teams));
