import AuthorizationLayout from '@pages/authorization/layout/AuthorizationLayout'
import SignInPage from '@pages/authorization/sign-in/SignInPage'
import SignUpPage from '@pages/authorization/sing-up/SignUpPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedLayout from './content/layout/ProtectedLayout'
import TeamsPage from './content/teams/TeamsPage'
import NotFoundPage from './not-found/NotFoundPage'
import PlayersPage from './content/players/PlayersPage'

export const SIGN_IN_PAGE = '/sign-in'
export const SIGN_UP_PAGE = '/sign-up'
export const TEAMS_PAGE = '/teams'
export const PLAYERS_PAGE = '/players'

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				Component: AuthorizationLayout,
				children: [
					{
						path: SIGN_IN_PAGE,
						Component: SignInPage,
					},
					{
						path: SIGN_UP_PAGE,
						Component: SignUpPage,
					},
				],
			},
			{
				path: '/',
				Component: ProtectedLayout,
        children: [
          {
            path: TEAMS_PAGE,
            Component: TeamsPage
          },
          {
            path: PLAYERS_PAGE,
            Component: PlayersPage
          },
        ]
			},
		],
	},
  {
    path: '*',
    Component: NotFoundPage
  }
])

const Router = () => {
	return <RouterProvider router={router} />
}

export default Router
