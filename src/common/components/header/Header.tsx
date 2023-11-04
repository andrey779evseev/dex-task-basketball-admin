import MenuIcon from '@assets/icons/MenuIcon'
import logo from '@assets/images/logo.svg'
import Menu from '@components/menu/Menu'
import MiniUserInfo from '@components/mini-user-info/MiniUserInfo'
import { useAnimationState } from '@hooks/useAnimationState'
import { useState } from 'react'
import s from './Header.module.scss'

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const animateIsOpen = useAnimationState(isMenuOpen)

	return (
		<header className={s.header}>
			{animateIsOpen ? (
				<Menu isOpen={isMenuOpen} close={() => setIsMenuOpen(false)} />
			) : null}
			<button
				className={s.menu_button}
				onClick={() => setIsMenuOpen((prev) => !prev)}
			>
				<MenuIcon />
			</button>
			<img src={logo} alt='logo' className={s.logo} />
			<div className={s.stub} />
			<MiniUserInfo className={s.user_container} />
		</header>
	)
}

export default Header
