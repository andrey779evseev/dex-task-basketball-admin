import { z } from 'zod'

export const SignUpFormValidator = z
	.object({
		name: z.string().min(3),
		login: z.string().min(3),
		password: z.string().min(8),
		password_confirmation: z.string().min(8),
		agree: z.boolean().refine((val) => !!val, 'You mast accept the agreement'),
	})
	.refine((data) => data.password === data.password_confirmation, {
		path: ['password_confirmation'],
		message: 'Passwords does not match',
	})

export type SignUpFormType = z.infer<typeof SignUpFormValidator>
