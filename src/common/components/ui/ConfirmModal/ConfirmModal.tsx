import { CrossIcon } from '@assets/icons/CrossIcon'
import { useLockBodyScroll } from '@hooks/useLockBodyScroll'
import { Button } from '../Button/Button'
import s from './ConfirmModal.module.scss'

interface Props {
	close: () => void
	isOpen: boolean
	title: string
	onConfirm: () => void
	isLoading?: boolean
}

export const ConfirmModal = (props: Props) => {
	const { close, isOpen, onConfirm, title, isLoading } = props

	useLockBodyScroll(isOpen)

	if (!isOpen) return null

	return (
		<div className={s.overlay}>
			<div className={s.modal}>
				<div className={s.header}>
					<h2 className={s.title}>{title}</h2>
					<button onClick={close}>
						<CrossIcon />
					</button>
				</div>
				<div className={s.actions}>
					<Button variant='secondary' onClick={close}>
						Cancel
					</Button>
					<Button onClick={onConfirm} isLoading={isLoading}>
						Delete
					</Button>
				</div>
			</div>
		</div>
	)
}
