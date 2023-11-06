import { z } from 'zod'

export const SignUpFormValidator = z
	.object({
		name: z.string().min(3).max(50),
		login: z.string().min(3).max(50),
		password: z.string().min(8).max(50),
		password_confirmation: z.string().min(8).max(50),
		agree: z.boolean().refine((val) => !!val, 'You mast accept the agreement'),
	})
	.refine((data) => data.password === data.password_confirmation, {
		path: ['password_confirmation'],
		message: 'Passwords does not match',
	})
