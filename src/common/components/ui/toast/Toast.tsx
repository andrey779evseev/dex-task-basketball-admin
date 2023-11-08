import { INotification } from '@interfaces/INotification'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import s from './Toast.module.scss'

interface Props {
	destroy: (id: string) => void
	notification: INotification
	duration?: number
}

export const Toast = (props: Props) => {
	const { destroy, notification, duration = 0 } = props
	const [isHide, setIsHide] = useState(false)

	useEffect(() => {
		if (!duration) return

		const timer = setTimeout(() => {
			setIsHide(true)
			setTimeout(() => {
				destroy(notification.id)
			}, 500)
		}, duration)

		return () => clearTimeout(timer)
	}, [destroy, duration, notification])

	return (
		<div
			className={classNames(s.toast, {
				[s.animate_in]: !isHide,
				[s.animate_out]: isHide,
			})}
			onClick={() => destroy(notification.id)}
		>
			{notification.message}
		</div>
	)
}
