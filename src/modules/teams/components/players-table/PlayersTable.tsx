import { IPlayer } from '@api/players/dto/IPlayer'
import { memo } from 'react'
import s from './PlayersTable.module.scss'

interface Props {
	players: IPlayer[]
}

const PlayersTable = memo((props: Props) => {
	const { players } = props
	return (
		<table className={s.table}>
			<thead>
				<tr>
					<th className={s.title} colSpan={5}>
						Roster
					</th>
				</tr>
				<tr className={s.labels}>
					<th>#</th>
					<th className={s.info}>Player</th>
					<th className={s.height}>Height</th>
					<th className={s.weight}>Weight</th>
					<th className={s.age}>Age</th>
				</tr>
			</thead>
			<tbody>
				{players.map((player) => (
					<tr key={player.id} className={s.row}>
						<td className={s.number}>
							{player.number === 0 ? '-' : player.number}
						</td>
						<td className={s.info}>
							<img
								src={player.avatarUrl}
								alt={`${player.name} avatar`}
								className={s.avatar}
							/>
							<div>
								<h5 className={s.name}>{player.name}</h5>
								<p className={s.position}>{player.position}</p>
							</div>
						</td>
						<td className={s.height}>{player.height} cm</td>
						<td className={s.weight}>{player.weight} kg</td>
						<td className={s.age}>19</td>
					</tr>
				))}
			</tbody>
		</table>
	)
})

export default PlayersTable
