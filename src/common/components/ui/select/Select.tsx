import { ChevronIcon } from '@assets/icons/ChevronIcon'
import { CrossIcon } from '@assets/icons/CrossIcon'
import { IOption } from '@interfaces/IOption'
import classNames from 'classnames'
import { FieldError } from 'react-hook-form'
import SelectBase, {
	ClearIndicatorProps,
	components,
	DropdownIndicatorProps,
	IndicatorSeparatorProps,
} from 'react-select'
import s from './Select.module.scss'

interface Props {
	id?: string
	label?: string
	value: IOption | undefined
	onChange: (value: IOption) => void
	options: IOption[]
	side?: 'top' | 'bottom' | 'auto'
	className?: string
	error?: FieldError
}

export const Select = (props: Props) => {
	const {
		value,
		onChange,
		options,
		side = 'bottom',
		className,
		id,
		label,
		error,
	} = props
	return (
		<div className={s.container}>
			{label !== undefined ? (
				<label htmlFor={id} className={s.label}>
					{label}
				</label>
			) : null}
			<SelectBase
				id={id}
				options={options}
				value={value}
				onChange={(e) => onChange(e!)}
				menuPlacement={side}
				placeholder='Select...'
				isSearchable={false}
				isMulti={false}
				isClearable={true}
				className={classNames(s.select, className, {
					[s.error]: error !== undefined,
				})}
				components={{
					DropdownIndicator,
					IndicatorSeparator,
					ClearIndicator,
				}}
				classNames={{
					control: () => s.control,
					valueContainer: () => s.value_container,
					placeholder: () => s.placeholder,
					singleValue: () => s.single_value,
					clearIndicator: () => s.clear_indicator,
					dropdownIndicator: () => s.dropdown_indicator,
					menu: () => s.menu,
					menuList: () => s.menu_list,
					option: ({ isSelected, isFocused }) =>
						classNames(s.option, {
							[s.selected]: isSelected,
							[s.focused]: isFocused,
						}),
				}}
			/>
			{error !== undefined ? <p className={s.error}>{error.message}</p> : null}
		</div>
	)
}

const DropdownIndicator = (props: DropdownIndicatorProps<IOption, boolean>) => {
	return (
		<components.DropdownIndicator {...props}>
			<ChevronIcon side='bottom' size={16} />
		</components.DropdownIndicator>
	)
}

const IndicatorSeparator = ({
	innerProps,
}: IndicatorSeparatorProps<IOption, boolean>) => {
	return <span className={s.indicator_separator} {...innerProps} />
}

const ClearIndicator = (props: ClearIndicatorProps<IOption>) => {
	return (
		<components.ClearIndicator {...props}>
			<CrossIcon />
		</components.ClearIndicator>
	)
}
