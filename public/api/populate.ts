import fs from "fs";
import { jobTitles } from "../../src/config/job-titles";
import { members } from "../../src/pages/members/data/data";
import { teams } from "../../src/pages/teams/data/data";
import { projects } from "../../src/pages/projects/data/data";
import { tasks } from "../../src/pages/tasks/data/data";
import { notes } from "../../src/pages/notes/data/data";

console.time("populate");

fs.writeFileSync(`./public/api/job-titles.json`, JSON.stringify(jobTitles));
fs.writeFileSync(`./public/api/members.json`, JSON.stringify(members));
fs.writeFileSync(`./public/api/teams.json`, JSON.stringify(teams));
fs.writeFileSync(`./public/api/projects.json`, JSON.stringify(projects));
fs.writeFileSync(`./public/api/tasks.json`, JSON.stringify(tasks));
fs.writeFileSync(`./public/api/notes.json`, JSON.stringify(notes));

console.timeEnd("populate");
