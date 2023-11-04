import GroupPersonIcon from '@assets/icons/GroupPersonIcon'
import LogoutIcon from '@assets/icons/LogoutIcon'
import PersonIcon from '@assets/icons/PersonIcon'
import MiniUserInfo from '@components/mini-user-info/MiniUserInfo'
import { useAppDispatch } from '@core/redux/store'
import { useBodyOverflow } from '@hooks/useBodyOverflow'
import { useClickOutside } from '@hooks/useClickOutside'
import { logoutAction } from '@modules/authorization/actions'
import { PLAYERS_PAGE, SIGN_IN_PAGE, TEAMS_PAGE } from '@pages/router'
import classNames from 'classnames'
import { memo, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import s from './Menu.module.scss'

interface Props {
	close: () => void
	isOpen: boolean
}

const Menu = memo((props: Props) => {
	const { close, isOpen } = props
	const { showOverflow, hideOverflow } = useBodyOverflow()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const ref = useClickOutside(() => close())

	useEffect(() => {
		if (isOpen) hideOverflow()
		else showOverflow()
	}, [isOpen, showOverflow, hideOverflow])

	const logout = () => {
		dispatch(logoutAction())
		navigate(SIGN_IN_PAGE)
	}

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
								to={TEAMS_PAGE}
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
								to={PLAYERS_PAGE}
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
