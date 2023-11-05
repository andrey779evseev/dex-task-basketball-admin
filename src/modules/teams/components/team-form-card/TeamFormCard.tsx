import { useCreateTeamMutation } from '@api/teams/teamsApi'
import Breadcrumbs from '@components/ui/breadcrumbs/Breadcrumbs'
import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import UploadImage from '@components/ui/upload-image/UploadImage'
import { addNotificationAction } from '@core/redux/notificationSlice'
import { useAppDispatch } from '@core/redux/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { ICreateTeamForm } from '@modules/teams/interfaces/ICreateTeamForm'
import { CreateTeamFormValidator } from '@modules/teams/validators/CreateTeamFromValidator'
import { ROUTES } from '@pages/router'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import s from './TeamFormCard.module.scss'

const TeamFormCard = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ICreateTeamForm>({
		resolver: zodResolver(CreateTeamFormValidator),
		defaultValues: {
			name: '',
			division: '',
			conference: '',
		},
	})
	const [createTeam, { isLoading }] = useCreateTeamMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onSubmit = async (data: ICreateTeamForm) => {
		try {
			await createTeam(data).unwrap()
			navigate(ROUTES.Teams)
		} catch (err) {
			console.error(err)
			dispatch(
				addNotificationAction("Something wen't wrong, while creating team"),
			)
		}
	}

	return (
		<div className={s.container}>
			<Breadcrumbs path={['Teams', 'Add new team']} />
			<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
				<Controller
					control={control}
					name='imageUrl'
					render={({ field: { onChange, value } }) => (
						<UploadImage
							url={value}
							setUrl={onChange}
							error={errors.imageUrl}
						/>
					)}
				/>
				<div className={s.inputs_container}>
					<Input
						id='name'
						label='Name'
						register={register('name')}
						error={errors.name}
					/>
					<Input
						id='division'
						label='Division'
						register={register('division')}
						error={errors.division}
					/>
					<Input
						id='conference'
						label='Conference'
						register={register('conference')}
						error={errors.conference}
					/>
					<Controller
						control={control}
						name='foundationYear'
						render={({ field: { onChange, value } }) => (
							<Input
								id='foundationYear'
								label='Year of foundation'
								value={(value ?? '').toString()}
								onChange={(e) => onChange(parseInt(e))}
								error={errors.foundationYear}
							/>
						)}
					/>
					<div className={s.actions}>
						<Link to={ROUTES.Teams}>
							<Button variant='secondary' type='button'>
								Cancel
							</Button>
						</Link>
						<Button type='submit' isLoading={isLoading}>
							Save
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default TeamFormCard
