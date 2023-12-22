import { z } from "zod";

export const preferencesSchema = z.object({
    email_notification: z.boolean().optional(),
    console_notification: z.boolean().optional(),
    themeMode: z.enum(["system", "light", "dark"]).optional(),
});

export type PreferencesSchema = z.infer<typeof preferencesSchema>;
