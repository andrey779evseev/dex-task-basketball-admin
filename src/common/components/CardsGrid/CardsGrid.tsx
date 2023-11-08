import { PropsWithChildren } from 'react'
import s from './CardsGrid.module.scss'

interface Props extends PropsWithChildren {}

export const CardsGrid = (props: Props) => {
	const { children } = props

	return <div className={s.cards_container}>{children}</div>
}
