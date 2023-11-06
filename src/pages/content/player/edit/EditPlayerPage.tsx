import { useGetPlayerQuery } from '@api/players/playersApi'
import PlayerFormCard from '@modules/players/components/player-form-card/PlayerFormCard'
import { useParams } from 'react-router-dom'

const EditPlayerPage = () => {
	const { playerId } = useParams()
	const { data: player, isError } = useGetPlayerQuery({
		id: parseInt(playerId!),
	})

	if (player === undefined || isError) return null

	return <PlayerFormCard editPlayer={player} />
}

export default EditPlayerPage
