import { z } from 'zod'
import { SignInFormValidator } from '../validators/SignInFormValidator'

export interface ISignInForm extends z.infer<typeof SignInFormValidator> {}
