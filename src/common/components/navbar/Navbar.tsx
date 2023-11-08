import { GroupPersonIcon } from '@assets/icons/GroupPersonIcon'
import { LogoutIcon } from '@assets/icons/LogoutIcon'
import { PersonIcon } from '@assets/icons/PersonIcon'
import { useLogout } from '@hooks/logout'
import { ROUTES } from '@pages/router'
import classNames from 'classnames'
import { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import s from './Navbar.module.scss'

export const Navbar = () => {
	const logout = useLogout()
	const { pathname } = useLocation()

	const page = useMemo(() => pathname.slice(1).split('/')[0], [pathname])

	return (
		<aside className={s.navbar}>
			<nav>
				<ul className={s.links}>
					<li>
						<NavLink
							to={ROUTES.Teams}
							className={({ isActive }) =>
								classNames(s.link, {
									[s.active]: isActive || page === 'team',
								})
							}
						>
							<GroupPersonIcon />
							<span className={s.link_title}>Teams</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to={ROUTES.Players}
							className={({ isActive }) =>
								classNames(s.link, {
									[s.active]: isActive || page === 'player',
								})
							}
						>
							<PersonIcon />
							<span className={s.link_title}>Players</span>
						</NavLink>
					</li>
				</ul>
			</nav>
			<button className={s.logout_button} onClick={logout}>
				<LogoutIcon />
				<span>Sign Out</span>
			</button>
		</aside>
	)
}
