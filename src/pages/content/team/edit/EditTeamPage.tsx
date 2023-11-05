import { useGetTeamQuery } from '@api/teams/teamsApi'
import TeamFormCard from '@modules/teams/components/team-form-card/TeamFormCard'
import { useParams } from 'react-router-dom'

const EditTeamPage = () => {
	const { teamId } = useParams()
	const { data: team, isError } = useGetTeamQuery({
		id: teamId!,
	})

	if (team === undefined || isError) return null

	return <TeamFormCard editTeam={team} />
}

export default EditTeamPage
