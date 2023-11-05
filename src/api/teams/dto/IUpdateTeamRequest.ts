import { ITeamForm } from '@modules/teams/interfaces/ITeamForm'

export interface IUpdateTeamRequest extends ITeamForm {
  id: number
}