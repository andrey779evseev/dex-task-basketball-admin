import { api } from '@api/common/api'
import { IPaginatedResponse } from '@api/common/dto/IPaginatedResponse'
import { ICreatePlayerRequest } from './dto/ICreatePlayerRequest'
import { IDeletePlayerRequest } from './dto/IDeletePlayerRequest'
import { IGetPlayerRequest } from './dto/IGetPlayerRequest'
import { IGetPlayersRequest } from './dto/IGetPlayersRequest'
import { IPlayer } from './dto/IPlayer'
import { IUpdatePlayerRequest } from './dto/IUpdatePlayerRequest'

export const playersApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getPlayers: builder.query<IPaginatedResponse<IPlayer>, IGetPlayersRequest>({
			query: (payload) => ({
				url: 'Player/GetPlayers',
				method: 'GET',
				params: {
					Name: payload.name ?? '',
					TeamIds: payload.teamIds ?? [],
					Page: payload.page,
					PageSize: payload.size,
				},
			}),
			providesTags: ['Players'],
		}),
		getPlayer: builder.query<IPlayer, IGetPlayerRequest>({
			query: (payload) => ({
				url: 'Player/Get',
				method: 'GET',
				params: {
					id: payload.id,
				},
			}),
			providesTags: (_result, _error, arg) => [{ type: 'Player', id: arg.id }],
		}),
		getPositions: builder.query<string[], void>({
			query: () => ({
				url: 'Player/GetPositions',
				method: 'GET',
			}),
		}),
		createPlayer: builder.mutation<IPlayer, ICreatePlayerRequest>({
			query: (payload) => ({
				url: 'Player/Add',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['Players'],
		}),
		updatePlayer: builder.mutation<IPlayer, IUpdatePlayerRequest>({
			query: (payload) => ({
				url: 'Player/Update',
				method: 'PUT',
				body: payload,
			}),
			invalidatesTags: (_result, _error, arg) => [
				{ type: 'Player', id: arg.id },
				'Players',
			],
		}),
		deletePlayer: builder.mutation<IPlayer, IDeletePlayerRequest>({
			query: (payload) => ({
				url: 'Player/Delete',
				method: 'DELETE',
				params: payload,
			}),
			invalidatesTags: (_result, _error, arg) => [
				{ type: 'Player', id: arg.id },
				'Players',
			],
		}),
	}),
})

export const {
	useGetPlayersQuery,
	useGetPlayerQuery,
	useGetPositionsQuery,
	useCreatePlayerMutation,
	useUpdatePlayerMutation,
	useDeletePlayerMutation,
} = playersApi
