import { z } from 'zod'

export const TeamFormValidator = z.object({
	name: z.string().min(3).max(50),
	division: z.string().min(3).max(50),
	conference: z.string().min(3).max(50),
	foundationYear: z
		.number()
		.min(1800, 'Year must not be less than 1800')
		.max(
			new Date().getUTCFullYear(),
			'Year must not be more than current year',
		),
	imageUrl: z.string().url(),
})
