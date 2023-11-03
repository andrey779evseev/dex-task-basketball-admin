import AuthorizationLayout from '@pages/authorization/layout/AuthorizationLayout'
import SignInPage from '@pages/authorization/sign-in/SignInPage'
import SignUpPage from '@pages/authorization/sing-up/SignUpPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				Component: AuthorizationLayout,
				children: [
					{
						path: 'sign-in',
						Component: SignInPage,
					},
					{
						path: 'sign-up',
						Component: SignUpPage,
					},
				],
			},
			{
				index: true,
				element: <div>Hello home page</div>,
			},
			// {
			// 	path: 'dashboard',
			// 	element: <Dashboard />,
			// 	loader: ({ request }) =>
			// 		fetch('/api/dashboard.json', {
			// 			signal: request.signal,
			// 		}),
			// },
			// {
			// 	element: <AuthLayout />,
			// 	children: [
			// 		{
			// 			path: 'login',
			// 			element: <Login />,
			// 			loader: redirectIfUser,
			// 		},
			// 		{
			// 			path: 'logout',
			// 			action: logoutUser,
			// 		},
			// 	],
			// },
		],
	},
])

const Router = () => {
	return <RouterProvider router={router} />
}

export default Router
