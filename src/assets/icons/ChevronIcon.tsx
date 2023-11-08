import { CSSProperties, useMemo } from 'react'

interface Props {
	side: 'bottom' | 'top' | 'left' | 'right'
	size?: number
	className?: string
	style?: CSSProperties
}

export const ChevronIcon = (props: Props) => {
	const { side, size = 20, className, style } = props
	const rotate = useMemo(() => {
		switch (side) {
			case 'top':
				return 90
			case 'right':
				return 180
			case 'bottom':
				return 270
			case 'left':
				return 0
		}
	}, [side])

	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 20 20'
			style={{ ...style, transform: `rotate(${rotate}deg)` }}
			className={className}
		>
			<path
				d='M12.4 5.76846C12.712 6.08046 12.712 6.58446 12.4 6.89646L9.296 10.0005L12.4 13.1045C12.712 13.4165 12.712 13.9205 12.4 14.2325C12.088 14.5445 11.584 14.5445 11.272 14.2325L7.6 10.5605C7.288 10.2485 7.288 9.74446 7.6 9.43246L11.272 5.76046C11.576 5.45646 12.088 5.45646 12.4 5.76846Z'
				style={{ fill: 'currentcolor' }}
			/>
		</svg>
	)
}
