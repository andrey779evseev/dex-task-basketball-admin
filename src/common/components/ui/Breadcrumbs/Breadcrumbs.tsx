import { Fragment } from 'react'
import s from './Breadcrumbs.module.scss'

interface Props {
	path: string[]
}

export const Breadcrumbs = (props: Props) => {
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
}
