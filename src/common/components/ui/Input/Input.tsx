import { CloseEyeIcon } from '@assets/icons/CloseEyeIcon'
import { EyeIcon } from '@assets/icons/EyeIcon'
import classNames from 'classnames'
import { ChangeEvent, useMemo, useState } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import s from './Input.module.scss'

/**
 * Either register or pair value and onChange must be specified
 */
interface Props {
	id: string
	label: string
	error?: FieldError
	disabled?: boolean
	type?: 'text' | 'password' | 'number'
  autoComplete?: 'off' | 'on' | 'name' | 'email' | 'username' | 'new-password' | 'current-password'

	register?: UseFormRegisterReturn
	onChange?: (newValue: string) => void
	value?: string | number
}

export const Input = (props: Props) => {
	const {
		id,
		label,
		register,
		error,
		disabled = false,
		type = 'text',
    autoComplete = 'off',
		value,
		onChange,
	} = props
	const [isShowPassword, setIsShowPassword] = useState(false)

	const properties = useMemo(() => {
		if (register === undefined && onChange === undefined)
			throw new Error(
				'Either register or pair value and onChange must be specified',
			)
		if (register !== undefined) return register
		return {
			onChange: (e: ChangeEvent<HTMLInputElement>) => onChange!(e.target.value),
			value,
		}
	}, [onChange, register, value])

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
          autoComplete={autoComplete}
					{...properties}
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
}
