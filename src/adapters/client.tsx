import { z } from "zod";

export const createClientSchema = z.object({
    company: z
        .string({
            required_error: "Empresa é necessária.",
        })
        .max(50, { message: "A empresa deve ter ao máximo 50 digitos." }),
    cpf: z
        .string({
            required_error: "CPF é necessário.",
        })
        .optional()
        .refine((arg) => !arg || (arg && arg.replace(/[^0-9]+/g, "").length === 11), "Digite um CPF válido."),
    cnpj: z
        .string({
            required_error: "CNPJ é necessário.",
        })
        .optional()
        .refine((arg) => !arg || (arg && arg.replace(/[^0-9]+/g, "").length === 14), "Digite um CNPJ válido."),
    // logotipo: z.string().optional(),
    logotipo: typeof window === "undefined" ? z.string() : z.record(z.any()).nullable().optional(),
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
