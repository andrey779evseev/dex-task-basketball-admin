import { useGetPlayersQuery } from '@api/players/playersApi'
import { useGetTeamQuery } from '@api/teams/teamsApi'
import { DetailTeamCard } from '@modules/teams/components/DetailTeamCard/DetailTeamCard'
import { PlayersTable } from '@modules/teams/components/PlayersTable/PlayersTable'
import { useParams } from 'react-router-dom'
import s from './TeamPage.module.scss'

export const TeamPage = () => {
	const { teamId } = useParams()
	const { data: team, isError: isTeamError } = useGetTeamQuery({
		id: parseInt(teamId!),
	})
	const { data: players, isError: isPlayersError } = useGetPlayersQuery({
		teamIds: [parseInt(teamId!)],
		page: 1,
		size: 100,
	})

	if (
		team === undefined ||
		players === undefined ||
		isTeamError ||
		isPlayersError
	)
		return null

	return (
		<div className={s.container}>
			<DetailTeamCard team={team} />
			{players.data.length !== 0 ? (
				<PlayersTable players={players.data} />
			) : null}
		</div>
	)
}
