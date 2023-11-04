import UserProfileIcon from '@assets/icons/UserProfileIcon'
import { useUser } from '@hooks/useUser'
import classNames from 'classnames'
import { memo } from 'react'
import s from './MiniUserInfo.module.scss'

interface Props {
	className?: string
}

const MiniUserInfo = memo((props: Props) => {
	const { className } = props
	const user = useUser()!
	return (
		<div className={classNames(s.container, className)}>
			<span className={s.username}>{user.name}</span>
			{user.avatarUrl === null ? (
				<UserProfileIcon className={s.avatar} />
			) : (
				<img
					src={user.avatarUrl}
					alt={`${user.name} avatar`}
					className={s.avatar}
				/>
			)}
		</div>
	)
})

export default MiniUserInfo
