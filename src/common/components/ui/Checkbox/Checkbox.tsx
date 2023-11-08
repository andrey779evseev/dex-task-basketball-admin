import classNames from 'classnames'
import { FieldError } from 'react-hook-form'
import s from './Checkbox.module.scss'

interface Props {
	label: string
	checked: boolean
	onChange: (newValue: boolean) => void
	error?: FieldError
	disabled?: boolean
}

export const Checkbox = (props: Props) => {
	const { label, checked, onChange, error, disabled = false } = props
	return (
		<div className={s.container}>
			<label
				className={classNames(s.checkbox_container, {
					[s.disabled]: disabled,
					[s.label_error]: error !== undefined,
				})}
			>
				<input
					type='checkbox'
					className={classNames(s.checkbox, {
						[s.checkbox_error]: error !== undefined,
						[s.checked]: checked,
					})}
					checked={checked}
					onChange={() => onChange(!checked)}
					disabled={disabled}
				/>
				{label}
			</label>
			{error !== undefined ? <p className={s.error}>{error.message}</p> : null}
		</div>
	)
}
