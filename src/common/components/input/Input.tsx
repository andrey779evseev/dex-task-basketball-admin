import CloseEyeIcon from '@assets/icons/CloseEyeIcon'
import EyeIcon from '@assets/icons/EyeIcon'
import classNames from 'classnames'
import { memo, useState } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import s from './Input.module.scss'

interface Props {
	id: string
	label: string
	register: UseFormRegisterReturn
	error?: FieldError
	disabled?: boolean
	type?: 'text' | 'password'
}

const Input = memo((props: Props) => {
	const { id, label, register, error, disabled = false, type = 'text' } = props
	const [isShowPassword, setIsShowPassword] = useState(false)

	return (
		<div className={s.container}>
			<label htmlFor={id} className={s.label}>
				{label}
			</label>
			<div className={s.input_container}>
				<input
					type={isShowPassword ? 'text' : type}
					id={id}
					disabled={disabled}
					className={classNames(s.input, {
						[s.input_error]: error !== undefined,
						[s.password]: type === 'password',
					})}
					{...register}
				/>
				{type === 'password' ? (
					<button
						onClick={() => setIsShowPassword((prev) => !prev)}
						className={s.eye_button}
						type='button'
					>
						{isShowPassword ? <EyeIcon /> : <CloseEyeIcon />}
					</button>
				) : null}
			</div>
			{error !== undefined ? <p className={s.error}>{error.message}</p> : null}
		</div>
	)
})

export default Input
