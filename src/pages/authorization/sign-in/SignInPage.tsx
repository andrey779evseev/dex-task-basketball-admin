import SignInForm from '@modules/authorization/components/sign-in/SignInForm'
import s from './SignInPage.module.scss'

const SignInPage = () => {
	return (
		<div className={s.container}>
			<SignInForm />
		</div>
	)
}

export default SignInPage
