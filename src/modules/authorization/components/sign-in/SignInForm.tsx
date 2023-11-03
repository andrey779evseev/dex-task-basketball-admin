import { useSignInMutation } from '@api/auth/authApi'
import Button from '@components/button/Button'
import Input from '@components/input/Input'
import { addNotificationAction } from '@core/redux/notificationSlice'
import { useAppDispatch } from '@core/redux/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginAction } from '@modules/authorization/actions'
import {
	SignInFormType,
	SignInFormValidator,
} from '@modules/authorization/validators/SignInFormValidator'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import s from '../../styles/SignForm.module.scss'

const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormType>({
		resolver: zodResolver(SignInFormValidator),
		defaultValues: {
			login: '',
			password: '',
		},
	})
	const [signIn, { isLoading }] = useSignInMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onSubmit = async (data: SignInFormType) => {
		try {
			const user = await signIn({
				login: data.login,
				password: data.password,
			}).unwrap()
			dispatch(loginAction(user))
			navigate('/')
		} catch (err: any) {
			if (err?.status === 401)
				dispatch(
					addNotificationAction("User with this credentials doesn't exist"),
				)
			else dispatch(addNotificationAction('Something went wrong'))
		}
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<h1 className={s.title}>Sign In</h1>
			<Input
				id='login'
				label='Login'
				register={register('login')}
				error={errors.login}
			/>
			<Input
				id='password'
				label='Password'
				type='password'
				register={register('password')}
				error={errors.password}
			/>
			<Button type='submit' isLoading={isLoading}>
				Submit
			</Button>

			<p className={s.suggestion}>
				Not a member yet?{' '}
				<Link to='/sign-up' className={s.link}>
					Sign Up
				</Link>
			</p>
		</form>
	)
}

export default SignInForm
