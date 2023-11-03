import SignUpForm from '@modules/authorization/components/sign-up/SignUpForm'
import s from './SignUpPage.module.scss'

const SignUpPage = () => {
	return (
		<div className={s.container}>
			<SignUpForm />
		</div>
	)
}

export default SignUpPage
