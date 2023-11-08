import { useDeleteImageMutation } from '@api/images/imagesApi'
import { ITeam } from '@api/teams/dto/ITeam'
import { useDeleteTeamMutation } from '@api/teams/teamsApi'
import { PenIcon } from '@assets/icons/PenIcon'
import { TrashIcon } from '@assets/icons/TrashIcon'
import { Breadcrumbs } from '@components/ui/Breadcrumbs/Breadcrumbs'
import { ConfirmModal } from '@components/ui/ConfirmModal/ConfirmModal'
import { ROUTES } from '@pages/router'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from './DetailTeamCard.module.scss'

interface Props {
	team: ITeam
}

export const DetailTeamCard = (props: Props) => {
	const { team } = props
	const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
	const [deleteTeam, { isLoading: isLoadingDeleteTeam }] =
		useDeleteTeamMutation()
	const [deleteImage, { isLoading: isLoadingDeleteImage }] =
		useDeleteImageMutation()
	const navigate = useNavigate()

	const removeTeam = async () => {
		await deleteImage({
			fileName: team.imageUrl.split('/').reverse()[0],
		}).unwrap()
		await deleteTeam({ id: team.id }).unwrap()
		setIsDeleteModalOpened(false)
		navigate(ROUTES.Teams)
	}

	return (
		<div className={s.container}>
			<div className={s.header}>
				<Breadcrumbs path={['Teams', team.name]} />
				<div className={s.actions}>
					<Link to={ROUTES.EditTeam(team.id)} className={s.action}>
						<button>
							<PenIcon />
						</button>
					</Link>
					<button
						className={s.action}
						onClick={() => setIsDeleteModalOpened(true)}
					>
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
						<div className={s.combine}>
							<h3 className={s.label}>Conference</h3>
							<p className={s.description}>{team.conference}</p>
						</div>
					</div>
				</div>
			</div>

			<ConfirmModal
				isOpen={isDeleteModalOpened}
				close={() => setIsDeleteModalOpened(false)}
				onConfirm={removeTeam}
				isLoading={isLoadingDeleteImage || isLoadingDeleteTeam}
				title={`Delete team "${team.name}"`}
			/>
		</div>
	)
}
