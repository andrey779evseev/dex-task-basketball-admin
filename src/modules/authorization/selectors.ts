import { RootState } from '@core/redux/store'

export const selectUser = (state: RootState) => state.authorization.user
