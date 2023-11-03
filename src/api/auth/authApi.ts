import { IChangeUserRequest } from '@api/auth/dto/request/IChangeUserRequest'
import { ISignInRequest } from '@api/auth/dto/request/ISignInRequest'
import { ISignUpRequest } from '@api/auth/dto/request/ISignUpRequest'
import { api } from '@core/redux/store'
import { IUser } from '@interfaces/IUser'

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		signUp: builder.mutation<IUser, ISignUpRequest>({
			query: (payload) => ({
				url: 'Auth/SignUp',
				method: 'POST',
				body: payload,
			}),
		}),
		changeUser: builder.mutation<void, IChangeUserRequest>({
			query: (payload) => ({
				url: 'Auth/Change',
				method: 'POST',
				body: payload,
			}),
		}),
		signIn: builder.mutation<IUser, ISignInRequest>({
			query: (payload) => ({
				url: 'Auth/SignIn',
				method: 'POST',
				body: payload,
			}),
		}),
	}),
})

export const { useChangeUserMutation, useSignInMutation, useSignUpMutation } =
	authApi
