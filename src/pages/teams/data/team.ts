import { Member } from "../../members/data/member";

export interface Team {
    id: string;
    name: string;
    slug: string;
    description: string;
    manager: Member;
    members: Member[];
    since: Date;
}
