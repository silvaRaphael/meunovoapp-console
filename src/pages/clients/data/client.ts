import { Project } from "pages/projects/data/project";
import { User } from "pages/users/data/user";

export interface Client {
    id: string;
    company: string;
    cpf?: string;
    cnpj?: string;
    logotipo?: string;
    users?: User[];
    projects?: Project[];
}
