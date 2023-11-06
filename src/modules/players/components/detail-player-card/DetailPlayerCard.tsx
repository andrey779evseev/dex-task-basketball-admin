import { useDeleteImageMutation } from '@api/images/imagesApi'
import { IPlayer } from '@api/players/dto/IPlayer'
import { useDeletePlayerMutation } from '@api/players/playersApi'
import { useGetTeamQuery } from '@api/teams/teamsApi'
import PenIcon from '@assets/icons/PenIcon'
import TrashIcon from '@assets/icons/TrashIcon'
import Breadcrumbs from '@components/ui/breadcrumbs/Breadcrumbs'
import ConfirmModal from '@components/ui/confirm-modal/ConfirmModal'
import { useDisclosure } from '@mantine/hooks'
import { ROUTES } from '@pages/router'
import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from './DetailPlayerCard.module.scss'

interface Props {
	player: IPlayer
}

const DetailPlayerCard = memo((props: Props) => {
	const { player } = props
	const { data: team, isError } = useGetTeamQuery({ id: player.team })
	const [isDeleteModalOpened, { open, close }] = useDisclosure(false)
	const [deletePlayer, { isLoading: isLoadingDeletePlayer }] =
		useDeletePlayerMutation()
	const [deleteImage, { isLoading: isLoadingDeleteImage }] =
		useDeleteImageMutation()
	const navigate = useNavigate()

	const removePlayer = async () => {
		await deleteImage({
			fileName: player.avatarUrl.split('/').reverse()[0],
		}).unwrap()
		await deletePlayer({ id: player.id }).unwrap()
		close()
		navigate(ROUTES.Players)
	}

	if (team === undefined || isError) return null

	return (
		<div className={s.container}>
			<div className={s.header}>
				<Breadcrumbs path={['Players', player.name]} />
				<div className={s.actions}>
					<Link to={ROUTES.EditPlayer(player.id)} className={s.action}>
						<button>
							<PenIcon />
						</button>
					</Link>
					<button className={s.action} onClick={() => open()}>
						<TrashIcon />
					</button>
				</div>
			</div>
			<div className={s.content}>
				<img
					src={player.avatarUrl}
					alt={`${player.name} image`}
					className={s.image}
				/>
				<div className={s.info}>
					<h1 className={s.title}>
						{player.name}{' '}
						{player.number !== 0 ? (
							<span className={s.red}>#{player.number}</span>
						) : null}
					</h1>
					<div className={s.group}>
						<div className={s.combine}>
							<h3 className={s.label}>Position</h3>
							<p className={s.description}>{player.position}</p>
						</div>
						<div className={s.combine}>
							<h3 className={s.label}>Team</h3>
							<p className={s.description}>{team.name}</p>
						</div>
						<div className={s.combine}>
							<h3 className={s.label}>Height</h3>
							<p className={s.description}>{player.height}</p>
						</div>
						<div className={s.combine}>
							<h3 className={s.label}>Weight</h3>
							<p className={s.description}>{player.weight}</p>
						</div>
						<div className={s.combine}>
							<h3 className={s.label}>Age</h3>
							<p className={s.description}>
								{new Date().getUTCFullYear() -
									new Date(player.birthday).getFullYear()}
							</p>
						</div>
					</div>
				</div>
			</div>

			<ConfirmModal
				isOpen={isDeleteModalOpened}
				close={close}
				onConfirm={removePlayer}
				isLoading={isLoadingDeleteImage || isLoadingDeletePlayer}
				title={`Delete player "${player.name}"`}
			/>
		</div>
	)
})

export default DetailPlayerCard
