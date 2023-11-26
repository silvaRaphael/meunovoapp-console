import { z } from "zod";

export const emailSchema = z.object({
    subject: z
        .string({
            required_error: "Digite um assunto para o e-mail.",
        })
        .min(1, {
            message: "Digite um assunto para o e-mail.",
        }),
    name: z
        .string({
            required_error: "Digite o nome do contato.",
        })
        .min(1, {
            message: "Digite o nome do contato.",
        }),
    projectDetails: z
        .string({
            required_error: "Digite os detalhes do projeto.",
        })
        .min(1, {
            message: "Digite os detalhes do projeto.",
        }),
    projectScope: z.array(
        z.object({
            title: z
                .string({
                    required_error: "Digite um escopo do projeto",
                })
                .min(1, {
                    message: "Digite um escopo do projeto",
                }),
            value: z
                .string({
                    required_error: "Descreva o escopo",
                })
                .min(1, {
                    message: "Descreva o escopo",
                }),
        }),
    ),
    projectDueDays: z
        .string({
            required_error: "Digite um prazo em dias.",
        })
        .min(1, {
            message: "Digite um prazo em dias.",
        }),
    projectPayment: z
        .string({
            required_error: "Digite a estrutura de pagamento.",
        })
        .min(1, {
            message: "Digite a estrutura de pagamento.",
        }),
    projectBenefits: z
        .string({
            required_error: "Digite os benefícios adicionais.",
        })
        .min(1, {
            message: "Digite os benefícios adicionais.",
        }),
});

export type EmailSchema = z.infer<typeof emailSchema>;
