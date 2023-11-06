import CalendarIcon from '@assets/icons/CalendarIcon'
import { DatePickerInput } from '@mantine/dates'
import classNames from 'classnames'
import { memo } from 'react'
import { FieldError } from 'react-hook-form'
import s from './DatePicker.module.scss'

interface Props {
	id: string
	label: string
	value: Date
	onChange: (value: Date | null) => void
	error?: FieldError
}

const DatePicker = memo((props: Props) => {
	const { value, onChange, id, label, error } = props

	return (
		<div className={s.container}>
			<label htmlFor={id} className={s.label}>
				{label}
			</label>
			<DatePickerInput
				id={id}
				value={value}
				onChange={onChange}
				classNames={{
					input: classNames(s.input, {
						[s.error]: error !== undefined,
					}),
				}}
				rightSection={<CalendarIcon />}
				rightSectionPointerEvents='none'
				valueFormat='DD.MM.YYYY'
			/>
			{error !== undefined ? <p className={s.error}>{error.message}</p> : null}
		</div>
	)
})

export default DatePicker
