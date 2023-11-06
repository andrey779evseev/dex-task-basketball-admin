import { z } from 'zod'
import { PlayerFormValidator } from '../validators/PlayerFormValidator'

export interface IPlayerForm extends z.infer<typeof PlayerFormValidator> {}