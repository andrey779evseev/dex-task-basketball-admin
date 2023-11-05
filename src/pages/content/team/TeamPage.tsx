import { useGetPlayersQuery } from '@api/players/playersApi'
import { useGetTeamQuery } from '@api/teams/teamsApi'
import DetailTeamCard from '@modules/teams/components/detail-team-card/DetailTeamCard'
import PlayersTable from '@modules/teams/components/players-table/PlayersTable'
import { useParams } from 'react-router-dom'
import s from './TeamPage.module.scss'

const TeamPage = () => {
	const { teamId } = useParams()
	const { data: team, isError: isTeamError } = useGetTeamQuery({ id: teamId! })
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

export default TeamPage
