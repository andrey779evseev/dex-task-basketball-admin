import store, { api } from '@core/redux/store'
import { IGetTeamsRequest } from './dto/get-teams/IGetTeamsRequest'
import { IGetTeamsResponse } from './dto/get-teams/IGetTeamsResponse'

export const teamApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getTeams: builder.query<IGetTeamsResponse, IGetTeamsRequest>({
			query: (payload) => ({
				url: 'Team/GetTeams',
				method: 'GET',
				params: {
					Name: payload.name,
					Page: payload.page,
					PageSize: payload.size,
				},
				headers: {
					Authorization: `Bearer ${store.getState().authorization.user?.token}`,
				},
			}),
		}),
	}),
})

export const { useGetTeamsQuery } = teamApi
