import { useUser } from '@hooks/useUser'
import { ROUTES } from '@pages/router'
import classNames from 'classnames'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import s from './AuthorizationLayout.module.scss'

export const AuthorizationLayout = () => {
	const user = useUser()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		if (user !== undefined) navigate(ROUTES.Teams)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className={s.container}>
			<div className={s.content}>
				<Outlet />
			</div>
			<div
				className={classNames(s.image, {
					[s.sign_in]: pathname === ROUTES.SignIn,
					[s.sign_up]: pathname === ROUTES.SignUp,
				})}
			/>
		</main>
	)
}
