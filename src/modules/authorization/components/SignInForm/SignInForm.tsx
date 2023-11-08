import { useSignInMutation } from '@api/auth/authApi'
import { Button } from '@components/ui/Button/Button'
import { Input } from '@components/ui/Input/Input'
import { addNotificationAction } from '@core/redux/notificationSlice'
import { useAppDispatch } from '@core/redux/store'
import { loginAction } from '@modules/authorization/actions'
import { ISignInForm } from '@modules/authorization/interfaces/ISignInForm'
import { ROUTES } from '@pages/router'
import { Validators } from '@validators/Validators'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import s from '../../styles/SignForm.module.scss'

export const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignInForm>({
		defaultValues: {
			login: '',
			password: '',
		},
	})
	const [signIn, { isLoading }] = useSignInMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onSubmit = async (data: ISignInForm) => {
		try {
			const user = await signIn({
				login: data.login,
				password: data.password,
			}).unwrap()
			dispatch(loginAction(user))
			navigate(ROUTES.Teams)
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
        autoComplete='username'
				register={register('login', {
					minLength: Validators.MinLength(3),
					maxLength: Validators.MaxLength(50),
					required: Validators.Required,
				})}
				error={errors.login}
			/>
			<Input
				id='password'
				label='Password'
				type='password'
        autoComplete='current-password'
				register={register('password', {
					minLength: Validators.MinLength(3),
					maxLength: Validators.MaxLength(50),
					required: Validators.Required,
				})}
				error={errors.password}
			/>
			<Button type='submit' isLoading={isLoading}>
				Submit
			</Button>

			<p className={s.suggestion}>
				Not a member yet?{' '}
				<Link to={ROUTES.SignUp} className={s.link}>
					Sign Up
				</Link>
			</p>
		</form>
	)
}
