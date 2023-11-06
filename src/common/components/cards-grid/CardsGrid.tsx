import { memo, PropsWithChildren } from 'react'
import s from './CardsGrid.module.scss'

interface Props extends PropsWithChildren {}

const CardsGrid = memo((props: Props) => {
	const { children } = props

	return <div className={s.cards_container}>{children}</div>
})

export default CardsGrid
