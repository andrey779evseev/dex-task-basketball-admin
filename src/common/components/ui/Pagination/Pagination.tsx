import { ChevronIcon } from '@assets/icons/ChevronIcon'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import s from './Pagination.module.scss'

interface Props {
	pagesCount: number
	setPage: (page: number) => void
	page: number
	syncWithQuery?: boolean
}

export const Pagination = (props: Props) => {
	const { pagesCount, page, setPage, syncWithQuery = true } = props
	const [isInitializedPage, setIsInitializedPage] = useState(false)
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		if (!syncWithQuery) return
		const queryPage = searchParams.get('page')
		if (queryPage !== null) setPage(parseInt(queryPage))
		setIsInitializedPage(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!syncWithQuery) return
		const queryPage = searchParams.get('page')
		if (
			isInitializedPage &&
			(queryPage === null || parseInt(queryPage) !== page)
		)
			navigate(`${pathname}?page=${page}`)
	}, [page, pathname, navigate, searchParams, isInitializedPage, syncWithQuery])

	return (
		<ReactPaginate
			breakLabel='...'
			nextLabel={<ChevronIcon side='right' />}
			onPageChange={(e) => setPage(e.selected + 1)}
			pageRangeDisplayed={3}
			marginPagesDisplayed={1}
			forcePage={page - 1}
			pageCount={pagesCount}
			previousLabel={<ChevronIcon side='left' />}
			renderOnZeroPageCount={null}
			className={s.pagination}
			previousClassName={s.control_button}
			previousLinkClassName={s.control_link}
			nextClassName={s.control_button}
			nextLinkClassName={s.control_link}
			pageClassName={s.page_button}
			activeClassName={s.active}
			breakClassName={s.break_button}
			breakLinkClassName={s.control_link}
			pageLinkClassName={s.control_link}
		/>
	)
}
