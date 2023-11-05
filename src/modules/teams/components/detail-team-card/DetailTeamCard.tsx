import { ITeam } from '@api/teams/dto/ITeam'
import PenIcon from '@assets/icons/PenIcon'
import TrashIcon from '@assets/icons/TrashIcon'
import Breadcrumbs from '@components/ui/breadcrumbs/Breadcrumbs'
import { memo } from 'react'
import s from './DetailTeamCard.module.scss'

interface Props {
	team: ITeam
}

const DetailTeamCard = memo((props: Props) => {
	const { team } = props
	return (
		<div className={s.container}>
			<div className={s.header}>
				<Breadcrumbs path={['Teams', team.name]} />
				<div className={s.actions}>
					<button className={s.action}>
						<PenIcon />
					</button>
					<button className={s.action}>
						<TrashIcon />
					</button>
				</div>
			</div>
			<div className={s.content}>
				<img
					src={team.imageUrl}
					alt={`${team.name} image`}
					className={s.image}
				/>
				<div className={s.info}>
					<h1 className={s.title}>{team.name}</h1>
					<div className={s.group}>
						<div className={s.combine}>
							<h3 className={s.label}>Year of foundation</h3>
							<p className={s.description}>{team.foundationYear}</p>
						</div>
						<div className={s.combine}>
							<h3 className={s.label}>Division</h3>
							<p className={s.description}>{team.division}</p>
						</div>
					</div>
					<div className={s.combine}>
						<h3 className={s.label}>Conference</h3>
						<p className={s.description}>{team.conference}</p>
					</div>
				</div>
			</div>
		</div>
	)
})

export default DetailTeamCard
