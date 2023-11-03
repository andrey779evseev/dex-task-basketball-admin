import { useUser } from '@hooks/useUser'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import s from './AuthorizationLayout.module.scss'

const AuthorizationLayout = () => {
	const user = useUser()
	const navigate = useNavigate()

	useEffect(() => {
		if (user !== undefined) navigate('/')
	}, [user, navigate])

	return (
		<main className={s.container}>
			<div className={s.content}>
				<Outlet />
			</div>
			<div className={s.image} />
		</main>
	)
}

export default AuthorizationLayout
