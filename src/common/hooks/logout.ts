import { api } from '@api/common/api'
import { useAppDispatch } from '@core/redux/store'
import { logoutAction } from '@modules/authorization/actions'
import { ROUTES } from '@pages/router'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	return () => {
		dispatch(logoutAction())
		dispatch(api.util.resetApiState())
		navigate(ROUTES.SignIn)
	}
}
