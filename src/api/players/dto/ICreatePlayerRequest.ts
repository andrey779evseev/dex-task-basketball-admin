import { IPlayer } from './IPlayer'

export interface ICreatePlayerRequest extends Omit<IPlayer, 'id'> {}
