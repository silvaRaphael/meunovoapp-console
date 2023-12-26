import { z } from "zod";

export const updateUserSchema = z
    .object({
        name: z
            .string({
                required_error: "Nome é necessário.",
            })
            .min(1, {
                message: "Nome é necessário.",
            }),
        email: z
            .string({
                required_error: "E-mail é necessário.",
            })
            .email({ message: "Diite um e-mail válgido" }),
        old_password: z
            .string({ required_error: "Senha antiga é necessária." })
            .min(5, { message: "Digite uma senha maior." })
            .max(20, { message: "Digite uma senha menor." })
            .optional(),
        password: z
            .string({ required_error: "Nova senha é necessária." })
            .min(5, { message: "Digite uma senha maior." })
            .max(20, { message: "Digite uma senha menor." })
            .optional(),
    })
    .refine((data) => !data.password || (data.old_password && data.password), {
        message: "Digite sua senha antiga.",
        path: ["old_password"],
    });
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const completeUserSchema = z
    .object({
        name: z
            .string({
                required_error: "Nome é necessário.",
            })
            .min(1, {
                message: "Nome é necessário.",
            }),
        email: z
            .string({
                required_error: "E-mail é necessário.",
            })
            .email({ message: "Digite um e-mail válido" }),
        password: z
            .string({ required_error: "Senha é necessária." })
            .min(5, { message: "Digite uma senha maior." })
            .max(20, { message: "Digite uma senha menor." }),
        confirm_password: z.string({
            required_error: "Confirme sua senha.",
        }),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "As senhas devem ser iguais.",
        path: ["confirm_password"],
    });
export type CompleteUserSchema = z.infer<typeof completeUserSchema>;
