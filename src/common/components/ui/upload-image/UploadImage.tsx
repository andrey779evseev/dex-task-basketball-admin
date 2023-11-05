import { useSaveImageMutation } from '@api/images/imagesApi'
import AddPhotoIcon from '@assets/icons/AddPhotoIcon'
import LoaderIcon from '@assets/icons/LoaderIcon'
import { addNotificationAction } from '@core/redux/notificationSlice'
import { useAppDispatch } from '@core/redux/store'
import classNames from 'classnames'
import { ChangeEvent, memo } from 'react'
import { FieldError } from 'react-hook-form'
import s from './UploadImage.module.scss'

interface Props {
	url: string | undefined
	setUrl: (value: string) => void
	error?: FieldError
}

const UploadImage = memo((props: Props) => {
	const { url, setUrl, error } = props
	const [uploadImage, { isLoading }] = useSaveImageMutation()
	const dispatch = useAppDispatch()

	const upload = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			const formData = new FormData()
			formData.append('file', e.target.files![0])
			const res = await uploadImage(formData).unwrap()
			setUrl(
				import.meta.env.VITE_REACT_APP_API.toString().replace('/api/', '') +
					res,
			)
		} catch (err) {
			console.error(err)
			dispatch(
				addNotificationAction("When uploading image, something wen't wrong"),
			)
		}
	}

	return (
		<div>
			<div
				className={classNames(s.container, {
					[s.container_error]: error !== undefined,
				})}
				style={{ backgroundImage: url !== undefined ? `url(${url})` : 'none' }}
			>
				{isLoading ? (
          <LoaderIcon className={s.loader_icon} />
				) : (
					<AddPhotoIcon className={s.photo_icon} />
				)}
        {url !== undefined ? <div className={s.overlay} /> : null}

				<input type='file' className={s.input} onChange={upload} />
			</div>
			{error !== undefined ? <p className={s.error}>{error.message}</p> : null}
		</div>
	)
})

export default UploadImage
