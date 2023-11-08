import { generateRandomString } from '@helpers/generateRandomString'
import { INotification } from '@interfaces/INotification'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface NotificationsState {
	queue: INotification[]
}

const initialState: NotificationsState = {
	queue: [],
}

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<INotification>) => {
			state.queue.push(action.payload)
		},
		remove: (state, action: PayloadAction<string>) => {
			const index = state.queue.findIndex((el) => el.id === action.payload)
			state.queue.splice(index, 1)
		},
	},
})

export const { add, remove: removeNotificationAction } =
	notificationsSlice.actions

export const addNotificationAction = (message: string) => {
	return add({
		id: generateRandomString(),
		message,
	})
}

export const selectNotifications = (state: RootState) =>
	state.notifications.queue
