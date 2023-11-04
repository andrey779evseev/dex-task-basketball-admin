import { IPaginatedResponse } from '@api/common/dto/IPaginatedResponse'
import store, { api } from '@core/redux/store'
import { IGetTeamRequest } from './dto/IGetTeamRequest'
import { IGetTeamsRequest } from './dto/IGetTeamsRequest'
import { ITeam } from './dto/ITeam'

export const teamApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getTeams: builder.query<IPaginatedResponse<ITeam>, IGetTeamsRequest>({
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
		getTeam: builder.query<ITeam, IGetTeamRequest>({
			query: (payload) => ({
				url: 'Team/Get',
				method: 'GET',
				params: {
					id: payload.id,
				},
				headers: {
					Authorization: `Bearer ${store.getState().authorization.user?.token}`,
				},
			}),
		}),
	}),
})

export const { useGetTeamsQuery, useGetTeamQuery } = teamApi
