import { z } from 'zod'

export const SignInFormValidator = z.object({
	login: z.string().min(3).max(50),
	password: z.string().min(8).max(50),
})
