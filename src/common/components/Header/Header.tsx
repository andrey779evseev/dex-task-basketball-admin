import { MenuIcon } from '@assets/icons/MenuIcon'
import logo from '@assets/images/logo.svg'
import { Menu } from '@components/Menu/Menu'
import { MiniUserInfo } from '@components/MiniUserInfo/MiniUserInfo'
import { useAnimationState } from '@hooks/useAnimationState'
import { ROUTES } from '@pages/router'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import s from './Header.module.scss'

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const animateIsOpen = useAnimationState(isMenuOpen)

	return (
		<header className={s.header}>
			{animateIsOpen ? (
				<Menu
					isOpen={isMenuOpen}
					close={() => setIsMenuOpen((prev) => !prev)}
				/>
			) : null}
			<button
				className={s.menu_button}
				onClick={() => {
					if (!animateIsOpen) setIsMenuOpen((prev) => !prev)
				}}
			>
				<MenuIcon />
			</button>
			<Link to={ROUTES.Teams} className={s.logo}>
				<img src={logo} alt='logo' className={s.logo} />
			</Link>
			<div className={s.stub} />
			<MiniUserInfo className={s.user_container} />
		</header>
	)
}
