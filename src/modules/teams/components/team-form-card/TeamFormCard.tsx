import { ITeam } from '@api/teams/dto/ITeam'
import {
	useCreateTeamMutation,
	useUpdateTeamMutation,
} from '@api/teams/teamsApi'
import Breadcrumbs from '@components/ui/breadcrumbs/Breadcrumbs'
import Button from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'
import UploadImage from '@components/ui/upload-image/UploadImage'
import { addNotificationAction } from '@core/redux/notificationSlice'
import { useAppDispatch } from '@core/redux/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { ITeamForm } from '@modules/teams/interfaces/ITeamForm'
import { TeamFormValidator } from '@modules/teams/validators/TeamFromValidator'
import { ROUTES } from '@pages/router'
import { memo, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import s from './TeamFormCard.module.scss'

interface Props {
	editTeam?: ITeam | undefined
}

const TeamFormCard = memo((props: Props) => {
	const { editTeam } = props
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ITeamForm>({
		resolver: zodResolver(TeamFormValidator),
		defaultValues: {
			name: '',
			division: '',
			conference: '',
		},
		values: editTeam,
	})
	const [createTeam, { isLoading: isCreateLoading }] = useCreateTeamMutation()
	const [updateTeam, { isLoading: isUpdateLoading }] = useUpdateTeamMutation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const isEdit = useMemo(() => editTeam !== undefined, [editTeam])

	const onSubmit = async (data: ITeamForm) => {
		try {
			if (isEdit) await updateTeam({ ...data, id: editTeam!.id }).unwrap()
			else await createTeam(data).unwrap()
			navigate(isEdit ? ROUTES.Team(editTeam!.id) : ROUTES.Teams)
		} catch (err) {
			console.error(err)
			dispatch(
				addNotificationAction("Something wen't wrong, while creating team"),
			)
		}
	}

	return (
		<div className={s.container}>
			<Breadcrumbs path={['Teams', isEdit ? 'Edit a team' : 'Add new team']} />
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
						<Link to={isEdit ? ROUTES.Team(editTeam!.id) : ROUTES.Teams}>
							<Button variant='secondary' type='button'>
								Cancel
							</Button>
						</Link>
						<Button
							type='submit'
							isLoading={isCreateLoading || isUpdateLoading}
						>
							Save
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
})

export default TeamFormCard
