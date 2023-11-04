import { ITeam } from '../ITeam'

export interface IGetTeamsResponse {
	data: ITeam[]
	count: number
	page: number
	size: number
}
