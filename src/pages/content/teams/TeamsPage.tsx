import { useGetTeamsQuery } from '@api/teams/teamApi'
import PlusIcon from '@assets/icons/PlusIcon'
import SearchIcon from '@assets/icons/SearchIcon'
import notFoundTeamsImage from '@assets/images/notFoundTeamsImage.svg'
import Button from '@components/ui/button/Button'
import Pagination from '@components/ui/pagination/Pagination'
import Search from '@components/ui/search/Search'
import Select, { Option } from '@components/ui/select/Select'
import { useDebounce } from '@hooks/useDebounce'
import TeamCard from '@modules/teams/components/team-card/TeamCard'
import { useMemo, useState } from 'react'
import s from './TeamsPage.module.scss'

const sizeOptions = [
	{ value: 6, label: '6' },
	{ value: 12, label: '12' },
	{ value: 24, label: '24' },
] as Option[]

const TeamsPage = () => {
	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 500)
	const [page, setPage] = useState(1)
	const [sizeOption, setSizeOption] = useState(sizeOptions[0])
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

				<Button className={s.add_button}>
					Add
					<PlusIcon />
				</Button>
			</div>

			{pages.data.length === 0 ? (
				<div className={s.empty_container}>
					<div className={s.empty_card}>
						<img
							src={notFoundTeamsImage}
							alt='not found teams image'
							className={s.empty_image}
						/>
						<div className={s.empty_text_container}>
							<h2 className={s.empty_title}>Empty here</h2>
							<p className={s.empty_description}>Add new teams to continue</p>
						</div>
					</div>
				</div>
			) : (
				<div className={s.cards_container}>
					{pages.data.map((team) => (
						<TeamCard key={team.id} team={team} />
					))}
				</div>
			)}
			{pages.data.length !== 0 ? (
				<div className={s.footer}>
					<Pagination
						pagesCount={Math.ceil(pages.count / size)}
						setPage={setPage}
						page={page}
					/>

					<Select
						options={sizeOptions}
						value={sizeOption}
						onChange={(e) => setSizeOption(e)}
						menuPlacement='top'
					/>
				</div>
			) : null}
		</div>
	)
}

export default TeamsPage
