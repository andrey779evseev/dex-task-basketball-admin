import UserProfileIcon from '@assets/icons/UserProfileIcon'
import logo from '@assets/images/logo.svg'
import { useUser } from '@hooks/useUser'
import s from './Header.module.scss'

const Header = () => {
	const user = useUser()!
	return (
		<header className={s.header}>
			<img src={logo} alt='logo' className={s.logo} />
			<div className={s.user_container}>
				<span className={s.username}>{user.name}</span>
				{user.avatarUrl === null ? (
					<UserProfileIcon />
				) : (
					<img src={user.avatarUrl} alt={`${user.name} avatar`} className={s.avatar} />
				)}
			</div>
		</header>
	)
}

export default Header
