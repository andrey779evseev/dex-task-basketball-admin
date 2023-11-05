import { z } from 'zod'
import { TeamFormValidator } from '../validators/TeamFromValidator'

export interface ITeamForm
	extends z.infer<typeof TeamFormValidator> {}
