import { z } from "zod";

export const createClientSchema = z.object({
    company: z
        .string({
            required_error: "Empresa é necessária.",
        })
        .max(50, { message: "A empresa deve ter ao máximo 50 digitos." }),
    logotipo: z.string().optional(),
});
export type CreateClientSchema = z.infer<typeof createClientSchema>;

export const updateClientSchema = z.object({
    id: z
        .string({
            required_error: "ID é necessário.",
        })
        .uuid({
            message: "ID válido é necessário.",
        }),
});
export type UpdateClientSchema = z.infer<typeof updateClientSchema>;

export const inviteUserSchema = z.object({
    email: z
        .string({
            required_error: "E-mail é necessário.",
        })
        .email({ message: "Digite um e-mail válido" }),
});
export type InviteUserSchema = z.infer<typeof inviteUserSchema>;
