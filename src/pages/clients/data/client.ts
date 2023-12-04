import { User } from "config/user";
import { Project } from "pages/projects/data/project";

export interface Client {
    id: string;
    company: string;
    cpf?: string;
    cnpj?: string;
    logotipo?: string;
    users?: User[];
    projects?: Project[];
}
