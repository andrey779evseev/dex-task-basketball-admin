import { SignUpForm } from '@modules/authorization/components/SignUpForm/SignUpForm'
import s from './SignUpPage.module.scss'

export const SignUpPage = () => {
	return (
		<div className={s.container}>
			<SignUpForm />
		</div>
	)
}
