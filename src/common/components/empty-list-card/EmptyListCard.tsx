import notFoundPlayersImage from '@assets/images/notFoundPlayersImage.svg'
import notFoundTeamsImage from '@assets/images/notFoundTeamsImage.svg'
import classNames from 'classnames'
import { memo } from 'react'
import s from './EmptyListCard.module.scss'

interface Props {
	type: 'teams' | 'players'
}

const EmptyListCard = memo((props: Props) => {
	const { type } = props
	return (
		<div className={s.empty_container}>
			<div className={s.empty_card}>
				<img
					src={type === 'teams' ? notFoundTeamsImage : notFoundPlayersImage}
					alt={`not found ${type} image`}
					className={classNames(s.empty_image, {
						[s.square]: type === 'players',
					})}
				/>
				<div className={s.empty_text_container}>
					<h2 className={s.empty_title}>Empty here</h2>
					<p className={s.empty_description}>Add new {type} to continue</p>
				</div>
			</div>
		</div>
	)
})

export default EmptyListCard
