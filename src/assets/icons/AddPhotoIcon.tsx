import { memo } from 'react'

interface Props {
	className?: string
}

const AddPhotoIcon = memo((props: Props) => {
	const { className } = props
	return (
		<svg
			width='74'
			height='75'
			viewBox='0 0 74 75'
			fill='none'
			className={className}
		>
			<g>
				<path
					opacity='0.7'
					fillRule='evenodd'
					clipRule='evenodd'
					d='M13.8748 29.6875C12.179 29.6875 10.7915 28.2812 10.7915 26.5625V20.3125H4.62481C2.92897 20.3125 1.54147 18.9062 1.54147 17.1875C1.54147 15.4688 2.92897 14.0625 4.62481 14.0625H10.7915V7.8125C10.7915 6.09375 12.179 4.6875 13.8748 4.6875C15.5706 4.6875 16.9581 6.09375 16.9581 7.8125V14.0625H23.1248C24.8206 14.0625 26.2081 15.4688 26.2081 17.1875C26.2081 18.9062 24.8206 20.3125 23.1248 20.3125H16.9581V26.5625C16.9581 28.2812 15.5706 29.6875 13.8748 29.6875ZM33.6143 40.625C35.2666 37.7244 38.3203 35.9375 41.625 35.9375C44.9297 35.9375 47.9834 37.7244 49.6357 40.625C51.2881 43.5257 51.2881 47.0994 49.6357 50C47.9834 52.9007 44.9297 54.6875 41.625 54.6875C38.3203 54.6875 35.2666 52.9007 33.6143 50C31.9619 47.0994 31.9619 43.5257 33.6143 40.625ZM66.2915 20.3125H56.5173L52.694 16.0938C51.5531 14.8125 49.8881 14.0625 48.1615 14.0625H28.4281C28.9523 15 29.2915 16.0312 29.2915 17.1875C29.2915 20.625 26.5165 23.4375 23.1248 23.4375H20.0415V26.5625C20.0415 30 17.2665 32.8125 13.8748 32.8125C12.734 32.8125 11.7165 32.4688 10.7915 31.9375V64.0625C10.7915 67.5 13.5665 70.3125 16.9581 70.3125H66.2915C69.6831 70.3125 72.4581 67.5 72.4581 64.0625V26.5625C72.4581 23.125 69.6831 20.3125 66.2915 20.3125ZM26.2079 45.3125C26.2079 53.9375 33.1146 60.9375 41.6246 60.9375C50.1346 60.9375 57.0413 53.9375 57.0413 45.3125C57.0413 36.6875 50.1346 29.6875 41.6246 29.6875C33.1146 29.6875 26.2079 36.6875 26.2079 45.3125Z'
					fill='white'
				/>
			</g>
		</svg>
	)
})

export default AddPhotoIcon