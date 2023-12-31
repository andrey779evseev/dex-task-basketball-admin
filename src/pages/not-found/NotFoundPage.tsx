import { useUser } from '@hooks/useUser'
import { ROUTES } from '@pages/router'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './NotFoundPage.module.scss'

export const NotFoundPage = () => {
	const user = useUser()
	const navigate = useNavigate()

	useEffect(() => {
		if (user === undefined) navigate(ROUTES.SignIn)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className={s.container}>
			<div className={s.image} />
			<div className={s.text_container}>
				<h1 className={s.title}>Page not found</h1>
				<p className={s.description}>
					Sorry, we can't find what you're looking for
				</p>
			</div>
		</main>
	)
}
