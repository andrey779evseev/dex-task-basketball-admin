import { IPlayer } from '@api/players/dto/IPlayer'
import { useGetPlayersQuery } from '@api/players/playersApi'
import { useGetTeamsQuery, useLazyGetTeamQuery } from '@api/teams/teamsApi'
import LoaderIcon from '@assets/icons/LoaderIcon'
import PlusIcon from '@assets/icons/PlusIcon'
import SearchIcon from '@assets/icons/SearchIcon'
import CardsGrid from '@components/cards-grid/CardsGrid'
import CardsGridItem from '@components/cards-grid/item/CardsGridItem'
import EmptyListCard from '@components/empty-list-card/EmptyListCard'
import PaginationFooter from '@components/pagination-footer/PaginationFooter'
import Button from '@components/ui/button/Button'
import Multiselect from '@components/ui/multiselect/Multiselect'
import Search from '@components/ui/search/Search'
import { IOption } from '@interfaces/IOption'
import { ROUTES } from '@pages/router'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MultiValue } from 'react-select'
import s from './PlayersPage.module.scss'

const PlayersPage = () => {
	const [search, setSearch] = useState('')
	const [selectedTeams, setSelectedTeams] = useState<MultiValue<IOption>>([])
	const [page, setPage] = useState(1)
	const [sizeOption, setSizeOption] = useState<IOption>({
		value: 6,
		label: '6',
	})
	const [players, setPlayers] = useState<(IPlayer & { teamName: string })[]>([])
	const size = useMemo(() => sizeOption.value as number, [sizeOption])
	const { data: teams, isError: isTeamsError } = useGetTeamsQuery({
		name: '',
		page: 1,
		size: 100,
	})
	const { data: pages, isError: isPlayersError } = useGetPlayersQuery({
		page,
		size,
		name: search,
		teamIds: selectedTeams.map((team) => team.value as number),
	})
	const [trigger] = useLazyGetTeamQuery()
	const [isLoadingFullPlayers, setIsLoadingFullPlayers] = useState(true)

	const teamsOptions = useMemo(() => {
		return (teams?.data ?? []).map((team) => ({
			value: team.id,
			label: team.name,
		})) as IOption[]
	}, [teams])

	useEffect(() => {
		// eslint-disable-next-line no-extra-semi
		;(async () => {
			const res = await Promise.all(
				(pages?.data ?? []).map(async (player) => {
					const team = await trigger({ id: player.team }).unwrap()
					return {
						...player,
						teamName: team.name,
					}
				}),
			)
			setPlayers(res)
			setIsLoadingFullPlayers(false)
		})()
	}, [pages, trigger])

	if (isLoadingFullPlayers)
		return (
			<div className={s.loader}>
				<LoaderIcon size={150} />
			</div>
		)

	if (
		teams === undefined ||
		isTeamsError ||
		pages === undefined ||
		isPlayersError
	)
		return null

	return (
		<div className={s.container}>
			<div className={s.header}>
				<Search
					value={search}
					onChange={setSearch}
					icon={<SearchIcon />}
					placeholder='Search...'
					className={s.search_input}
				/>

				<Multiselect
					options={teamsOptions}
					value={selectedTeams}
					onChange={setSelectedTeams}
					className={s.teams_select}
				/>

				<div className={s.add_button_container}>
					<Link to={ROUTES.CreatePlayer}>
						<Button className={s.add_button}>
							Add
							<PlusIcon />
						</Button>
					</Link>
				</div>
			</div>

			{pages.data.length === 0 ? (
				<EmptyListCard type='players' />
			) : (
				<CardsGrid>
					{players.map((player) => (
						<CardsGridItem
							key={player.id}
							url={ROUTES.Player(player.id)}
							image={player.avatarUrl}
							title={
								<>
									{player.name}
									{player.number !== 0 ? (
										<span className={s.red}> #{player.number}</span>
									) : null}
								</>
							}
							description={player.teamName}
							isPlayerImage
						/>
					))}
				</CardsGrid>
			)}

			{pages.data.length !== 0 ? (
				<PaginationFooter
					pagesCount={Math.ceil(pages.count / size)}
					page={page}
					setPage={setPage}
					setSizeOption={setSizeOption}
					sizeOption={sizeOption}
				/>
			) : null}
		</div>
	)
}

export default PlayersPage
