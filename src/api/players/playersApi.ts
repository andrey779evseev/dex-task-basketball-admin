import { IPaginatedResponse } from '@api/common/dto/IPaginatedResponse'
import { api } from '@core/redux/store'
import { IGetPlayerRequest } from './dto/IGetPlayerRequest'
import { IGetPlayersRequest } from './dto/IGetPlayersRequest'
import { IPlayer } from './dto/IPlayer'

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
		}),
		getPlayer: builder.query<IPlayer, IGetPlayerRequest>({
			query: (payload) => ({
				url: 'Player/Get',
				method: 'GET',
				params: {
					id: payload.id,
				},
			}),
		}),
	}),
})

export const { useGetPlayersQuery, useGetPlayerQuery } = playersApi
