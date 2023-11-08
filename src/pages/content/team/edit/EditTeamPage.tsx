import { useGetTeamQuery } from '@api/teams/teamsApi'
import { TeamFormCard } from '@modules/teams/components/TeamFormCard/TeamFormCard'
import { useParams } from 'react-router-dom'

export const EditTeamPage = () => {
	const { teamId } = useParams()
	const { data: team, isError } = useGetTeamQuery({
		id: parseInt(teamId!),
	})

	if (team === undefined || isError) return null

	return <TeamFormCard editTeam={team} />
}
