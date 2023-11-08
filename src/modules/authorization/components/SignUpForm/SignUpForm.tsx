import { useSignUpMutation } from '@api/auth/authApi'
import { Button } from '@components/ui/Button/Button'
import { Checkbox } from '@components/ui/Checkbox/Checkbox'
import { Input } from '@components/ui/Input/Input'
import { addNotificationAction } from '@core/redux/notificationSlice'
import { useAppDispatch } from '@core/redux/store'
import { loginAction } from '@modules/authorization/actions'
import { ISignUpForm } from '@modules/authorization/interfaces/ISignUpForm'
import { ROUTES } from '@pages/router'
import { Validators } from '@validators/Validators'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import s from '../../styles/SignForm.module.scss'

export const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		getValues,
	} = useForm<ISignUpForm>({
		defaultValues: {
			login: '',
			password: '',
			name: '',
			password_confirmation: '',
			agree: false,
		},
	})
	const [signUp, { isLoading }] = useSignUpMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onSubmit = async (data: ISignUpForm) => {
		try {
			const user = await signUp({
				login: data.login,
				password: data.password,
				userName: data.name,
			}).unwrap()
			dispatch(loginAction(user))
			navigate(ROUTES.Teams)
		} catch (err: any) {
			if (err?.originalStatus === 409)
				dispatch(addNotificationAction('User with this login already exists'))
			else dispatch(addNotificationAction('Something went wrong'))
		}
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<h1 className={s.title}>Sign Up</h1>
			<Input
				id='name'
				label='Name'
				register={register('name', {
					minLength: Validators.MinLength(3),
					maxLength: Validators.MaxLength(50),
					required: Validators.Required,
				})}
				error={errors.name}
			/>
			<Input
				id='login'
				label='Login'
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
				register={register('password', {
					minLength: Validators.MinLength(8),
					maxLength: Validators.MaxLength(50),
					required: Validators.Required,
				})}
				error={errors.password}
			/>
			<Input
				id='password_confirmation'
				label='Enter your password again'
				type='password'
				register={register('password_confirmation', {
					minLength: Validators.MinLength(8),
					maxLength: Validators.MaxLength(50),
					validate: (value) => {
						const { password } = getValues()
						return password === value || 'Passwords does not match'
					},
				})}
				error={errors.password_confirmation}
			/>
			<Controller
				control={control}
				rules={{
					validate: (value) => {
						if (value == null || value === false) {
							return 'You mast accept the agreement'
						}
						return true
					},
				}}
				name='agree'
				render={({ field: { onChange, value } }) => (
					<Checkbox
						label='I accept the agreement'
						error={errors.agree}
						checked={value}
						onChange={onChange}
					/>
				)}
			/>
			<Button type='submit' isLoading={isLoading}>
				Submit
			</Button>

			<p className={s.suggestion}>
				Already a member?{' '}
				<Link to={ROUTES.SignIn} className={s.link}>
					Sign In
				</Link>
			</p>
		</form>
	)
}
