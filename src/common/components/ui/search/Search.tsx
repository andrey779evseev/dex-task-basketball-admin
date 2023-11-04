import classNames from 'classnames'
import { memo } from 'react'
import s from './Search.module.scss'

interface Props {
	value: string
	onChange: (newValue: string) => void
	placeholder?: string
	icon?: JSX.Element
	onIconClick?: () => void
	className?: string
}

const Search = memo((props: Props) => {
	const { onChange, value, placeholder, icon, onIconClick, className } = props
	return (
		<div className={classNames(s.container, className)}>
			<input
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={classNames(s.input, {
					[s.extra_pr]: icon !== undefined,
				})}
			/>
			<button className={s.icon_button} type='button' onClick={onIconClick}>
				{icon !== undefined ? icon : null}
			</button>
		</div>
	)
})

export default Search
