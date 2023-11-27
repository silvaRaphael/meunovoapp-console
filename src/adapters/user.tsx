import { z } from "zod";

export const profileSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(50, {
            message: "Name must not be longer than 100 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    role: z.string({
        required_error: "Please select a role to display.",
    }),
    avatar: z.any().optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
