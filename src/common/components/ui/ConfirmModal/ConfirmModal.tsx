import { CrossIcon } from '@assets/icons/CrossIcon'
import { useAnimationState } from '@hooks/useAnimationState'
import { useLockBodyScroll } from '@hooks/useLockBodyScroll'
import classNames from 'classnames'
import { Button } from '../Button/Button'
import s from './ConfirmModal.module.scss'
import { useClickOutside } from '@hooks/useClickOutside'

interface Props {
	close: () => void
	isOpen: boolean
	title: string
	onConfirm: () => void
	isLoading?: boolean
}

export const ConfirmModal = (props: Props) => {
	const { close, isOpen, onConfirm, title, isLoading } = props
	const animatedIsOpen = useAnimationState(isOpen)
  const ref = useClickOutside<HTMLDivElement>(() => close())
	useLockBodyScroll(isOpen)

	if (!animatedIsOpen) return null

	return (
		<div
			className={classNames(s.overlay, {
				[s.animate_in_overlay]: isOpen,
				[s.animate_out_overlay]: !isOpen,
			})}
		>
			<div
				className={classNames(s.modal, {
					[s.animate_in]: isOpen,
					[s.animate_out]: !isOpen,
				})}
        ref={ref}
			>
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
