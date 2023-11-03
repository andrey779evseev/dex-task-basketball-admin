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
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { notificationsSlice } from './notificationSlice'

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_API }),
	endpoints: () => ({}),
})

const store = configureStore({
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
export default store
