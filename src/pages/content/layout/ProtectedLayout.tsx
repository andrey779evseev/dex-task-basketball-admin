import Header from '@components/header/Header'
import Navbar from '@components/navbar/Navbar'
import { useUser } from '@hooks/useUser'
import { ROUTES } from '@pages/router'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import s from './ProtectedLayout.module.scss'

const ProtectedLayout = () => {
	const user = useUser()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		if (user === undefined) navigate(ROUTES.SignIn)
		else if (pathname === '/') navigate(ROUTES.Teams)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (user === undefined) return null

	return (
		<main className={s.container}>
			<Header />
			<div className={s.content}>
				<Navbar />
				<div className={s.page_wrapper}>
					<Outlet />
				</div>
			</div>
		</main>
	)
}

export default ProtectedLayout
