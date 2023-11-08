import { Toaster } from '@components/ui/Toast/Toaster'
import { persistor, store } from '@core/redux/store'
import { Router } from '@pages/router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import '@assets/styles/index.scss'
import 'react-datepicker/dist/react-datepicker.css'

export const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router />
				<Toaster />
			</PersistGate>
		</Provider>
	)
}
