import { z } from 'zod'

export const SignInFormValidator = z.object({
	login: z.string().min(3),
	password: z.string().min(8),
})

export type SignInFormType = z.infer<typeof SignInFormValidator>
