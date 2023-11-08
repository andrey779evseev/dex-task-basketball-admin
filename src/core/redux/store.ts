import { api } from '@api/common/api'
import { persistedAuthorizationReducer } from '@modules/authorization/reducer'
import { configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { notificationsSlice } from './notificationSlice'

export const store = configureStore({
	devTools: import.meta.env.NODE_ENV !== 'production',
	reducer: {
		[api.reducerPath]: api.reducer,
		notifications: notificationsSlice.reducer,
		authorization: persistedAuthorizationReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persistor = persistStore(store)
