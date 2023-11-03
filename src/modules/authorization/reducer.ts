import { IUser } from '@interfaces/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

interface AuthorizationState {
	user: IUser | undefined
}

const initialState: AuthorizationState = {
	user: undefined,
}

const persistConfig = {
	version: 1,
	key: 'authorization',
	storage,
}

export const authorizationSlice = createSlice({
	name: 'authorization',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
		},
		logout: (state) => {
			state.user = undefined
		},
	},
})

export const persistedAuthorizationReducer = persistReducer(
	persistConfig,
	authorizationSlice.reducer,
)
