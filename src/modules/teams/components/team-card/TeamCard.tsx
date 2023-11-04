import { ITeam } from '@api/teams/dto/ITeam'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import s from './TeamCard.module.scss'

interface Props {
	team: ITeam
}

const TeamCard = memo((props: Props) => {
	const { team } = props
	return (
		<Link to={`/team/${team.id}`}>
			<div className={s.card}>
				<div className={s.image_container}>
					<img
						src={team.imageUrl}
						alt={`${team.name} image`}
						className={s.image}
					/>
				</div>
				<div className={s.footer}>
					<h3 className={s.title}>{team.name}</h3>
					<p className={s.description}>
						Year of foundation: {team.foundationYear}
					</p>
				</div>
			</div>
		</Link>
	)
})

export default TeamCard
