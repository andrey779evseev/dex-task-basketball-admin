import { useGetPlayerQuery } from '@api/players/playersApi'
import { DetailPlayerCard } from '@modules/players/components/DetailPlayerCard/DetailPlayerCard'
import { useParams } from 'react-router-dom'

export const PlayerPage = () => {
	const { playerId } = useParams()
	const { data: player, isError } = useGetPlayerQuery({
		id: parseInt(playerId!),
	})

	if (player === undefined || isError) return null

	return <DetailPlayerCard player={player} />
}
