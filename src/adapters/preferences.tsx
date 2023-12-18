import { z } from "zod";

export const preferencesSchema = z.object({
    emailNotification: z.boolean(),
    themeMode: z.enum(["system", "light", "dark"]).optional(),
});

export type PreferencesSchema = z.infer<typeof preferencesSchema>;
