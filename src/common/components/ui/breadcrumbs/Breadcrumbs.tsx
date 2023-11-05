import { Fragment, memo } from 'react'
import s from './Breadcrumbs.module.scss'

interface Props {
	path: string[]
}

const Breadcrumbs = memo((props: Props) => {
	const { path } = props
	return (
		<span className={s.breadcrumbs}>
			{path.map((item, i) => (
				<Fragment key={i}>
					{item}
					{i !== path.length - 1 ? (
						<span className={s.divider}> / </span>
					) : null}
				</Fragment>
			))}
		</span>
	)
})

export default Breadcrumbs
