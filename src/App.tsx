import Toaster from '@components/ui/toast/Toaster'
import store, { persistor } from '@core/redux/store'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import Router from '@pages/router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
        <MantineProvider>
					<Router />
        </MantineProvider>
				<Toaster />
			</PersistGate>
		</Provider>
	)
}

export default App
