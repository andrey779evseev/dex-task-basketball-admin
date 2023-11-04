import { useUser } from '@hooks/useUser'
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '@pages/router'
import classNames from 'classnames'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import s from './AuthorizationLayout.module.scss'

const AuthorizationLayout = () => {
	const user = useUser()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		if (user !== undefined) navigate('/')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className={s.container}>
			<div className={s.content}>
				<Outlet />
			</div>
			<div
				className={classNames(s.image, {
					[s.sign_in]: pathname === SIGN_IN_PAGE,
					[s.sign_up]: pathname === SIGN_UP_PAGE,
				})}
			/>
		</main>
	)
}

export default AuthorizationLayout
