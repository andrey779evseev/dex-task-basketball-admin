import { z } from 'zod'
import { CreateTeamFormValidator } from '../validators/CreateTeamFromValidator'

export interface ICreateTeamForm
	extends z.infer<typeof CreateTeamFormValidator> {}
