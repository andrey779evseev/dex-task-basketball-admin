import ChevronIcon from '@assets/icons/ChevronIcon'
import { IOption } from '@interfaces/IOption'
import classNames from 'classnames'
import { memo } from 'react'
import {
	components,
	DropdownIndicatorProps,
	IndicatorSeparatorProps,
	default as SelectBase,
} from 'react-select'
import s from './PaginationSelect.module.scss'

interface Props {
	value: IOption
	onChange: (value: IOption) => void
	options: IOption[]
}

const PaginatedSelect = memo((props: Props) => {
	const { value, onChange, options } = props
	return (
		<SelectBase
			options={options}
			value={value}
			onChange={(e) => onChange(e!)}
			menuPlacement='top'
			isSearchable={false}
			isMulti={false}
			isClearable={false}
			className={s.select}
			components={{ DropdownIndicator, IndicatorSeparator }}
			classNames={{
				control: () => s.control,
				valueContainer: () => s.value_container,
				singleValue: () => s.single_value,
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
	)
})

export default PaginatedSelect

const DropdownIndicator = (props: DropdownIndicatorProps<IOption, boolean>) => {
	return (
		<components.DropdownIndicator {...props}>
			<ChevronIcon side='bottom' size={24} />
		</components.DropdownIndicator>
	)
}

const IndicatorSeparator = ({
	innerProps,
}: IndicatorSeparatorProps<IOption, boolean>) => {
	return <span className={s.indicator_separator} {...innerProps} />
}
