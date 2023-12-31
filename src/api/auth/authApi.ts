import { IChangeUserRequest } from '@api/auth/dto/IChangeUserRequest'
import { ISignInRequest } from '@api/auth/dto/ISignInRequest'
import { ISignUpRequest } from '@api/auth/dto/ISignUpRequest'
import { IUser } from '@api/auth/dto/IUser'
import { api } from '@api/common/api'

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
