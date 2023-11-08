import { SignInForm } from '@modules/authorization/components/SignInForm/SignInForm'
import s from './SignInPage.module.scss'

export const SignInPage = () => {
	return (
		<div className={s.container}>
			<SignInForm />
		</div>
	)
}
