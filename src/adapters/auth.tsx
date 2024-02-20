import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string({ required_error: 'Digite seu e-mail.' }).email({ message: 'Digite um e-mail válido.' }),
  password: z
    .string({ required_error: 'Digite sua senha.' })
    .min(5, { message: 'Digite uma senha maior.' })
    .max(20, { message: 'Digite uma senha menor.' })
})
export type SignInSchema = z.infer<typeof signInSchema>
