import { PaginatedSelect } from '@components/PaginationSelect/PaginationSelect'
import { Pagination } from '@components/ui/Pagination/Pagination'
import { IOption } from '@interfaces/IOption'
import s from './PaginationFooter.module.scss'

const sizeOptions = [
	{ value: 6, label: '6' },
	{ value: 12, label: '12' },
	{ value: 24, label: '24' },
] as IOption[]

interface Props {
	pagesCount: number
	page: number
	setPage: (page: number) => void
	sizeOption: IOption
	setSizeOption: (option: IOption) => void
}

export const PaginationFooter = (props: Props) => {
	const { page, pagesCount, setPage, setSizeOption, sizeOption } = props
	return (
		<div className={s.footer}>
			<Pagination pagesCount={pagesCount} setPage={setPage} page={page} />

			<PaginatedSelect
				options={sizeOptions}
				value={sizeOption}
				onChange={(option) => {
					setPage(1)
					setSizeOption(option)
				}}
			/>
		</div>
	)
}
