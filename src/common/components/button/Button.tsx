import LoaderIcon from '@assets/icons/LoaderIcon'
import classNames from 'classnames'
import { memo, PropsWithChildren } from 'react'
import s from './Button.module.scss'

interface Props extends PropsWithChildren {
	disabled?: boolean
	icon?: JSX.Element
	variant?: 'primary' | 'secondary'
	onClick?: () => void
	isLoading?: boolean
	type?: 'button' | 'reset' | 'submit'
}

const Button = memo((props: Props) => {
	const {
		children,
		icon,
		variant = 'primary',
		onClick,
		disabled = false,
		isLoading,
		type,
	} = props
	return (
		<button
			className={classNames(s.button, {
				[s.secondary]: variant === 'secondary',
				[s.loading]: isLoading,
			})}
			onClick={
				isLoading || disabled || onClick === undefined ? undefined : onClick
			}
			disabled={disabled}
			type={type}
		>
			{children}
			{isLoading ? <LoaderIcon /> : icon}
		</button>
	)
})

export default Button
