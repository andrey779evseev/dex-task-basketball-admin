import Toaster from '@components/ui/toast/Toaster'
import store, { persistor } from '@core/redux/store'
import Router from '@pages/router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router />
				<Toaster />
			</PersistGate>
		</Provider>
	)
}

export default App
