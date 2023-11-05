import { z } from 'zod'
import { SignUpFormValidator } from '../validators/SignUpFormValidator'

export interface ISignUpForm extends z.infer<typeof SignUpFormValidator> {}
