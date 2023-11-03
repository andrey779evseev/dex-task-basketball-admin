import { useAppSelector } from '@core/redux/store'
import { selectUser } from '@modules/authorization/selectors'

export const useUser = () => useAppSelector(selectUser)
