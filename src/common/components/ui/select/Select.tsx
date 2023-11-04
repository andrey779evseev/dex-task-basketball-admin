import { memo } from 'react'
import { default as SelectBase } from 'react-select'
import type { GroupBase, OptionsOrGroups } from 'react-select'
import './Select.scss'

export interface Option {
	label: string | number
	value: string | number
}

interface Props {
	options: OptionsOrGroups<Option, GroupBase<Option>>
	value: Option
	onChange: (newValue: Option) => void
	menuPlacement?: 'top' | 'bottom' | 'auto'
	isSearchable?: boolean
}

const Select = memo((props: Props) => {
	const {
		options,
		value,
		onChange,
		menuPlacement = 'auto',
		isSearchable = false,
	} = props
	return (
		<SelectBase
			options={options}
			value={value}
			onChange={(e) => onChange(e!)}
			menuPlacement={menuPlacement}
			classNamePrefix='react-select'
			isSearchable={isSearchable}
		/>
	)
})

export default Select
