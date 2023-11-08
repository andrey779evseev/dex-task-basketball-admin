import { useGetTeamsQuery } from '@api/teams/teamsApi'
import { PlusIcon } from '@assets/icons/PlusIcon'
import { SearchIcon } from '@assets/icons/SearchIcon'
import { CardsGrid } from '@components/CardsGrid/CardsGrid'
import { CardsGridItem } from '@components/CardsGrid/CardsGridItem/CardsGridItem'
import { EmptyListCard } from '@components/EmptyListCard/EmptyListCard'
import { PaginationFooter } from '@components/PaginationFooter/PaginationFooter'
import { Button } from '@components/ui/Button/Button'
import { Search } from '@components/ui/Search/Search'
import { useDebounce } from '@hooks/useDebounce'
import { IOption } from '@interfaces/IOption'
import { ROUTES } from '@pages/router'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import s from './TeamsPage.module.scss'

export const TeamsPage = () => {
	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 500)
	const [page, setPage] = useState(1)
	const [sizeOption, setSizeOption] = useState<IOption>({
		value: 6,
		label: '6',
	})
	const size = useMemo(() => sizeOption.value as number, [sizeOption])
	const { data: pages, isError } = useGetTeamsQuery({
		name: debouncedSearch,
		page: page,
		size: size,
	})

	if (!pages || isError) return null

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

				<div className={s.add_button_container}>
					<Link to={ROUTES.CreateTeam}>
						<Button className={s.add_button}>
							Add
							<PlusIcon />
						</Button>
					</Link>
				</div>
			</div>

			{pages.data.length === 0 ? (
				<EmptyListCard type='teams' />
			) : (
				<CardsGrid>
					{pages.data.map((team) => (
						<CardsGridItem
							key={team.id}
							url={ROUTES.Team(team.id)}
							image={team.imageUrl}
							title={team.name}
							description={`Year of foundation: ${team.foundationYear}`}
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
