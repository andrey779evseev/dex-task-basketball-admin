import ChevronIcon from '@assets/icons/ChevronIcon'
import CrossIcon from '@assets/icons/CrossIcon'
import { IOption } from '@interfaces/IOption'
import classNames from 'classnames'
import { Children, memo } from 'react'
import {
	ClearIndicatorProps,
	components,
	DropdownIndicatorProps,
	IndicatorSeparatorProps,
	MultiValue,
	MultiValueRemoveProps,
	default as SelectBase,
	ValueContainerProps,
} from 'react-select'
import s from './Multiselect.module.scss'

interface Props {
	value: MultiValue<IOption>
	onChange: (value: MultiValue<IOption>) => void
	options: IOption[]
	side?: 'top' | 'bottom' | 'auto'
	className?: string
}

const Multiselect = memo((props: Props) => {
	const { value, onChange, options, side = 'bottom', className } = props
	return (
		<SelectBase
			options={options}
			value={value}
			onChange={(e) => onChange(e!)}
			menuPlacement={side}
			placeholder='Select...'
			isSearchable={false}
			isMulti={true}
			isClearable={true}
			className={classNames(s.select, className)}
			components={{
				DropdownIndicator,
				IndicatorSeparator,
				MultiValueRemove,
				ClearIndicator,
				ValueContainer,
			}}
			classNames={{
				control: () => s.control,
				valueContainer: () => s.value_container,
				placeholder: () => s.placeholder,
				multiValue: () => s.multi_value,
				multiValueLabel: () => s.multi_value_label,
				multiValueRemove: () => s.multi_value_remove,
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
			hideSelectedOptions={false}
			closeMenuOnSelect={false}
		/>
	)
})

export default Multiselect

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

const MultiValueRemove = (props: MultiValueRemoveProps<IOption>) => {
	return (
		<components.MultiValueRemove {...props}>
			<CrossIcon />
		</components.MultiValueRemove>
	)
}

const ClearIndicator = (props: ClearIndicatorProps<IOption>) => {
	return (
		<components.ClearIndicator {...props}>
			<CrossIcon />
		</components.ClearIndicator>
	)
}

const ValueContainer = memo(
	({ children, ...props }: ValueContainerProps<IOption>) => {
		const { hasValue } = props
		if (!hasValue) {
			return (
				<components.ValueContainer {...props}>
					{children}
				</components.ValueContainer>
			)
		}

		const [selected, otherChildren] = children as (
			| ReturnType<typeof Children.toArray>[]
			| ReturnType<typeof Children.toArray>
		)[]

		const displaySelected =
			Array.isArray(selected) && selected.length > 0 ? selected[0] : selected

		return (
			<components.ValueContainer {...props}>
				{displaySelected}

				{selected.length > 1 ? <span className={s.more}>...</span> : null}

				{otherChildren}
			</components.ValueContainer>
		)
	},
)
