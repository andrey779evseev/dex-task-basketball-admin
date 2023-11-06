import AuthorizationLayout from '@pages/authorization/layout/AuthorizationLayout'
import SignInPage from '@pages/authorization/sign-in/SignInPage'
import SignUpPage from '@pages/authorization/sing-up/SignUpPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedLayout from './content/layout/ProtectedLayout'
import CreatePlayerPage from './content/player/create/CreatePlayerPage'
import EditPlayerPage from './content/player/edit/EditPlayerPage'
import PlayerPage from './content/player/PlayerPage'
import PlayersPage from './content/players/PlayersPage'
import CreateTeamPage from './content/team/create/CreateTeamPage'
import EditTeamPage from './content/team/edit/EditTeamPage'
import TeamPage from './content/team/TeamPage'
import TeamsPage from './content/teams/TeamsPage'
import NotFoundPage from './not-found/NotFoundPage'

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTES = {
	SignIn: '/sign-in',
	SignUp: '/sign-up',
	Teams: '/teams',
	TeamStatic: '/team/:teamId',
	Team: (teamId: number | string) => `/team/${teamId}`,
	CreateTeam: '/team/create',
	EditTeamStatic: '/team/:teamId/edit',
	EditTeam: (teamId: number | string) => `/team/${teamId}/edit`,
	Players: '/players',
	PlayerStatic: '/player/:teamId',
	Player: (teamId: number | string) => `/player/${teamId}`,
	CreatePlayer: '/player/create',
	EditPlayerStatic: '/player/:teamId/edit',
	EditPlayer: (teamId: number | string) => `/player/${teamId}/edit`,
}

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				Component: AuthorizationLayout,
				children: [
					{
						path: ROUTES.SignIn,
						Component: SignInPage,
					},
					{
						path: ROUTES.SignUp,
						Component: SignUpPage,
					},
				],
			},
			{
				path: '/',
				Component: ProtectedLayout,
				children: [
					{
						path: ROUTES.Teams,
						Component: TeamsPage,
					},
					{
						path: ROUTES.TeamStatic,
						Component: TeamPage,
					},
					{
						path: ROUTES.CreateTeam,
						Component: CreateTeamPage,
					},
					{
						path: ROUTES.EditTeamStatic,
						Component: EditTeamPage,
					},
					{
						path: ROUTES.Players,
						Component: PlayersPage,
					},
					{
						path: ROUTES.PlayerStatic,
						Component: PlayerPage,
					},
					{
						path: ROUTES.CreatePlayer,
						Component: CreatePlayerPage,
					},
					{
						path: ROUTES.EditPlayerStatic,
						Component: EditPlayerPage,
					},
				],
			},
		],
	},
	{
		path: '*',
		Component: NotFoundPage,
	},
])

const Router = () => {
	return <RouterProvider router={router} />
}

export default Router
