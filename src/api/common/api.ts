import { RootState } from '@core/redux/store'
import { serializeQuery } from '@helpers/serializeQuery'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_REACT_APP_API,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).authorization.user?.token
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	},
	paramsSerializer: (params) => {
		return serializeQuery(params)
	},
})

const baseQueryWithAuthCheck: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, baseApi, extraOptions) => {
	const result = await baseQuery(args, baseApi, extraOptions)
	// const token = store.getState().authorization.user?.token
	// if (result.error && token) {
	// 	const { exp } = parseJwt(token)
	// 	if (result.error.status === 401 || new Date().getTime() >= exp) {
	// 		baseApi.dispatch(logoutAction())
	// 		baseApi.dispatch(api.util.resetApiState())
	// 		// do not replace pathname with variable ROUTES, it makes cycle deps
	// 		window.location.pathname = '/sign-in'
	// 	}
	// }
	return result
}

export const api = createApi({
	baseQuery: baseQueryWithAuthCheck,
	endpoints: () => ({}),
	tagTypes: ['Teams', 'Team', 'Players', 'Player'],
})
