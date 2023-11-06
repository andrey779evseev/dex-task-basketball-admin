import { z } from 'zod'

export const PlayerFormValidator = z.object({
	name: z.string().min(3).max(50),
	number: z.number().nonnegative().optional(),
	position: z.string().min(1),
	team: z.number().nonnegative(),
	birthday: z.date(),
	height: z.number().min(100).max(300),
	weight: z.number().min(30).max(300),
	avatarUrl: z.string().url(),
})
