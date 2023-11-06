import { IPaginatedResponse } from '@api/common/dto/IPaginatedResponse'
import { ICreatePlayerRequest } from './dto/ICreatePlayerRequest'
import { IGetPlayerRequest } from './dto/IGetPlayerRequest'
import { IGetPlayersRequest } from './dto/IGetPlayersRequest'
import { IPlayer } from './dto/IPlayer'
import { IUpdatePlayerRequest } from './dto/IUpdatePlayerRequest'
import { api } from '@api/common/api'

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
		getPositions: builder.query<string[], void>({
			query: () => ({
				url: 'Player/GetPositions',
				method: 'GET',
			})
		}),
	}),
})

export const {
	useGetPlayersQuery,
	useGetPlayerQuery,
	useCreatePlayerMutation,
	useUpdatePlayerMutation,
  useGetPositionsQuery
} = playersApi
