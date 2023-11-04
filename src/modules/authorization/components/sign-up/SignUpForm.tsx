import { useSignUpMutation } from '@api/auth/authApi'
import Button from '@components/ui/button/Button'
import Checkbox from '@components/ui/checkbox/Checkbox'
import Input from '@components/ui/input/Input'
import { addNotificationAction } from '@core/redux/notificationSlice'
import { useAppDispatch } from '@core/redux/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginAction } from '@modules/authorization/actions'
import {
	SignUpFormType,
	SignUpFormValidator,
} from '@modules/authorization/validators/SignUpFormValidator'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import s from '../../styles/SignForm.module.scss'

const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<SignUpFormType>({
		resolver: zodResolver(SignUpFormValidator),
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

	const onSubmit = async (data: SignUpFormType) => {
		try {
			const user = await signUp({
				login: data.login,
				password: data.password,
				userName: data.name,
			}).unwrap()
			dispatch(loginAction(user))
			navigate('/')
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
				register={register('name')}
				error={errors.name}
			/>
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
			<Input
				id='password_confirmation'
				label='Enter your password again'
				type='password'
				register={register('password_confirmation')}
				error={errors.password_confirmation}
			/>
			<Controller
				control={control}
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
				<Link to='/sign-in' className={s.link}>
					Sign In
				</Link>
			</p>
		</form>
	)
}

export default SignUpForm
