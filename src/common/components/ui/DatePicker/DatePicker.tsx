import { CalendarIcon } from '@assets/icons/CalendarIcon'
import classNames from 'classnames'
import { forwardRef } from 'react'
import DatePickerBase from 'react-datepicker'
import { FieldError } from 'react-hook-form'
import s from './DatePicker.module.scss'

interface Props {
	id: string
	label: string
	value: Date
	onChange: (value: Date | null) => void
	error?: FieldError
}

export const DatePicker = (props: Props) => {
	const { value, onChange, id, label, error } = props

	return (
		<div className={s.container}>
			<label htmlFor={id} className={s.label}>
				{label}
			</label>
			<DatePickerBase
				selected={value}
				onChange={onChange}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				customInput={<CustomInput />}
				className={classNames(s.input_container, {
					[s.error]: error !== undefined,
				})}
				dateFormat='dd.MM.yyyy'
			/>
			{error !== undefined ? <p className={s.error}>{error.message}</p> : null}
		</div>
	)
}

const CustomInput = forwardRef<HTMLDivElement, { onChange: any; value: any }>(
	({ value, onChange, ...props }, ref) => (
		<div ref={ref} {...props}>
			<input
				type='text'
				value={value}
				onChange={onChange}
				className={s.input}
			/>
			<div className={s.icon}>
				<CalendarIcon />
			</div>
		</div>
	),
)
