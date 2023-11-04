import Header from '@components/header/Header'
import Navbar from '@components/navbar/Navbar'
import { useUser } from '@hooks/useUser'
import { SIGN_IN_PAGE, TEAMS_PAGE } from '@pages/router'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import s from './ProtectedLayout.module.scss'

const ProtectedLayout = () => {
	const user = useUser()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		if (user === undefined) navigate(SIGN_IN_PAGE)
		else if (pathname === '/') navigate(TEAMS_PAGE)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (user === undefined) return null

	return (
		<main className={s.container}>
			<Header />
			<div className={s.content}>
				<Navbar />
				<Outlet />
			</div>
		</main>
	)
}

export default ProtectedLayout
