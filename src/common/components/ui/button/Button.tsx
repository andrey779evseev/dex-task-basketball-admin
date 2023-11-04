import LoaderIcon from '@assets/icons/LoaderIcon'
import classNames from 'classnames'
import { memo, PropsWithChildren } from 'react'
import s from './Button.module.scss'

interface Props extends PropsWithChildren {
	disabled?: boolean
	variant?: 'primary' | 'secondary'
	onClick?: () => void
	isLoading?: boolean
	type?: 'button' | 'reset' | 'submit'
	className?: string
}

const Button = memo((props: Props) => {
	const {
		children,
		variant = 'primary',
		onClick,
		disabled = false,
		isLoading,
		type,
		className,
	} = props
	return (
		<button
			className={classNames(s.button, className, {
				[s.secondary]: variant === 'secondary',
				[s.loading]: isLoading,
			})}
			onClick={
				isLoading || disabled || onClick === undefined ? undefined : onClick
			}
			disabled={disabled}
			type={type}
		>
			{isLoading ? <LoaderIcon /> : null}
			{children}
		</button>
	)
})

export default Button
