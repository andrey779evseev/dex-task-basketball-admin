import GroupPersonIcon from '@assets/icons/GroupPersonIcon'
import LogoutIcon from '@assets/icons/LogoutIcon'
import PersonIcon from '@assets/icons/PersonIcon'
import MiniUserInfo from '@components/mini-user-info/MiniUserInfo'
import { useLogout } from '@hooks/logout'
import { useClickOutside } from '@hooks/useClickOutside'
import { useLockBodyScroll } from '@hooks/useLockBodyScroll'
import { ROUTES } from '@pages/router'
import classNames from 'classnames'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import s from './Menu.module.scss'

interface Props {
	close: () => void
	isOpen: boolean
}

const Menu = memo((props: Props) => {
	const { close, isOpen } = props
  const logout = useLogout()
	const ref = useClickOutside(() => {
    console.log('outside')
    close()
  })
	useLockBodyScroll()

	return (
		<div
			className={classNames(s.container, {
				[s.container_animate_in]: isOpen,
				[s.container_animate_out]: !isOpen,
			})}
		>
			<aside
				className={classNames(s.menu, {
					[s.menu_animate_in]: isOpen,
					[s.menu_animate_out]: !isOpen,
				})}
				ref={ref}
			>
				<div className={s.user_container}>
					<MiniUserInfo />
				</div>
				<nav className={s.nav_container}>
					<ul className={s.links}>
						<li>
							<NavLink
								to={ROUTES.Teams}
								className={({ isActive }) =>
									classNames(s.link, {
										[s.active]: isActive,
									})
								}
							>
								<GroupPersonIcon />
								<span>Teams</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to={ROUTES.Players}
								className={({ isActive }) =>
									classNames(s.link, {
										[s.active]: isActive,
									})
								}
							>
								<PersonIcon />
								<span>Players</span>
							</NavLink>
						</li>
					</ul>
					<button onClick={logout} className={s.logout_button}>
						<LogoutIcon />
						<span>Sign out</span>
					</button>
				</nav>
			</aside>
		</div>
	)
})

export default Menu
