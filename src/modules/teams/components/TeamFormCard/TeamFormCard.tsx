import { ITeam } from '@api/teams/dto/ITeam'
import {
	useCreateTeamMutation,
	useUpdateTeamMutation,
} from '@api/teams/teamsApi'
import { Breadcrumbs } from '@components/ui/Breadcrumbs/Breadcrumbs'
import { Button } from '@components/ui/Button/Button'
import { Input } from '@components/ui/Input/Input'
import { UploadImage } from '@components/ui/UploadImage/UploadImage'
import { addNotificationAction } from '@core/redux/notificationSlice'
import { useAppDispatch } from '@core/redux/store'
import { ITeamForm } from '@modules/teams/interfaces/ITeamForm'
import { ROUTES } from '@pages/router'
import { Validators } from '@validators/Validators'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import s from './TeamFormCard.module.scss'

interface Props {
	editTeam?: ITeam | undefined
}

export const TeamFormCard = (props: Props) => {
	const { editTeam } = props
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ITeamForm>({
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
				addNotificationAction(
					`Something wen't wrong, while ${
						isEdit ? 'updating' : 'creating'
					} team`,
				),
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
					rules={{
						required: Validators.Required,
						pattern: Validators.Url,
					}}
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
						register={register('name', {
							minLength: Validators.MinLength(3),
							maxLength: Validators.MaxLength(50),
							required: Validators.Required,
						})}
						error={errors.name}
					/>
					<Input
						id='division'
						label='Division'
						register={register('division', {
							minLength: Validators.MinLength(3),
							maxLength: Validators.MaxLength(50),
							required: Validators.Required,
						})}
						error={errors.division}
					/>
					<Input
						id='conference'
						label='Conference'
						register={register('conference', {
							minLength: Validators.MinLength(3),
							maxLength: Validators.MaxLength(50),
							required: Validators.Required,
						})}
						error={errors.conference}
					/>
					<Controller
						control={control}
						name='foundationYear'
						rules={{
							required: Validators.Required,
							min: Validators.Min(1800),
							max: Validators.Max(new Date().getUTCFullYear()),
						}}
						render={({ field: { onChange, value } }) => (
							<Input
								id='foundationYear'
								label='Year of foundation'
								value={(value ?? '').toString()}
								onChange={(e) => onChange(parseInt(e) || 0)}
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
}
