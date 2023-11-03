import GroupPersonIcon from '@assets/icons/GroupPersonIcon'
import PersonIcon from '@assets/icons/PersonIcon'
import classNames from 'classnames'
import { NavLink, useNavigate } from 'react-router-dom'
import s from './Navbar.module.scss'
import LogoutIcon from '@assets/icons/LogoutIcon'
import { useAppDispatch } from '@core/redux/store'
import { logoutAction } from '@modules/authorization/actions'
import { PLAYERS_PAGE, SIGN_IN_PAGE, TEAMS_PAGE } from '@pages/router'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(logoutAction())
    navigate(SIGN_IN_PAGE)
  }
	return (
		<aside className={s.navbar}>
			<nav>
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
							<span className={s.link_title}>Teams</span>
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
							<span className={s.link_title}>Players</span>
						</NavLink>
					</li>
				</ul>
			</nav>
      <button className={s.logout_button} onClick={logout}>
        <LogoutIcon/>
        <span>Sign Out</span>
      </button>
		</aside>
	)
}

export default Navbar
