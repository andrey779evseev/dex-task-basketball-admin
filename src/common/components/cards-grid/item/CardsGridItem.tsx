import classNames from 'classnames'
import { memo, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import s from './CardsGridItem.module.scss'

interface Props {
	image: string
	title: ReactNode
	description: string
	url: string
	isPlayerImage?: boolean
}

const CardsGridItem = memo((props: Props) => {
	const { image, title, description, url, isPlayerImage = false } = props
	return (
		<Link to={url}>
			<div className={s.card}>
				<div
					className={classNames(s.image_container, {
						[s.player]: isPlayerImage,
					})}
				>
					<img src={image} alt={`${url} image`} className={s.image} />
				</div>
				<div className={s.footer}>
					<h3 className={s.title}>{title}</h3>
					<p className={s.description}>{description}</p>
				</div>
			</div>
		</Link>
	)
})

export default CardsGridItem
