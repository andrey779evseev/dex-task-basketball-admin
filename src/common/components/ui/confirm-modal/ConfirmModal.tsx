import { Modal } from '@mantine/core'
import { memo } from 'react'
import Button from '../button/Button'
import s from './ConfirmModal.module.scss'

interface Props {
	close: () => void
	isOpen: boolean
	title: string
	onConfirm: () => void
	isLoading?: boolean
}

const ConfirmModal = memo((props: Props) => {
	const { close, isOpen, onConfirm, title, isLoading } = props
	return (
		<Modal opened={isOpen} onClose={close} centered title={title}>
			<div className={s.actions}>
				<Button variant='secondary' onClick={() => close()}>
					Cancel
				</Button>
				<Button onClick={onConfirm} isLoading={isLoading}>
					Delete
				</Button>
			</div>
		</Modal>
	)
})

export default ConfirmModal