import { api } from '@api/common/api'
import { IPaginatedResponse } from '@api/common/dto/IPaginatedResponse'
import { ICreateTeamRequest } from './dto/ICreateTeamRequest'
import { IDeleteTeamRequest } from './dto/IDeleteTeamRequest'
import { IGetTeamRequest } from './dto/IGetTeamRequest'
import { IGetTeamsRequest } from './dto/IGetTeamsRequest'
import { ITeam } from './dto/ITeam'
import { IUpdateTeamRequest } from './dto/IUpdateTeamRequest'

export const teamsApi = api.injectEndpoints({
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
			}),
			providesTags: ['Teams'],
		}),
		getTeam: builder.query<ITeam, IGetTeamRequest>({
			query: (payload) => ({
				url: 'Team/Get',
				method: 'GET',
				params: {
					id: payload.id,
				},
			}),
			providesTags: (_result, _error, arg) => [{ type: 'Team', id: arg.id }],
		}),
		createTeam: builder.mutation<ITeam, ICreateTeamRequest>({
			query: (payload) => ({
				url: 'Team/Add',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['Teams'],
		}),
		updateTeam: builder.mutation<ITeam, IUpdateTeamRequest>({
			query: (payload) => ({
				url: 'Team/Update',
				method: 'PUT',
				body: payload,
			}),
			invalidatesTags: (_result, _error, arg) => [
				{ type: 'Team', id: arg.id },
				'Teams',
			],
		}),
		deleteTeam: builder.mutation<ITeam, IDeleteTeamRequest>({
			query: (payload) => ({
				url: 'Team/Delete',
				method: 'DELETE',
				params: payload,
			}),
			invalidatesTags: (_result, _error, arg) => [
				{ type: 'Team', id: arg.id },
				'Teams',
			],
		}),
	}),
})

export const {
	useGetTeamsQuery,
	useGetTeamQuery,
	useLazyGetTeamQuery,
	useCreateTeamMutation,
	useUpdateTeamMutation,
	useDeleteTeamMutation,
} = teamsApi
