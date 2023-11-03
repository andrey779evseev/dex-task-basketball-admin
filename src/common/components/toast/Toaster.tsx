import {
	removeNotificationAction,
	selectNotifications,
} from '@core/redux/notificationSlice'
import { useAppDispatch, useAppSelector } from '@core/redux/store'
import { useCallback } from 'react'
import Toast from './Toast'
import s from './Toaster.module.scss'

const Toaster = () => {
	const notifications = useAppSelector(selectNotifications)
	const dispatch = useAppDispatch()

	const destroy = useCallback(
		(id: string) => dispatch(removeNotificationAction(id)),
		[dispatch],
	)
	return (
		<div className={s.toaster}>
			{notifications.map((notification) => (
				<Toast
					notification={notification}
					destroy={destroy}
					key={notification.id}
					duration={5000}
				/>
			))}
		</div>
	)
}

export default Toaster
