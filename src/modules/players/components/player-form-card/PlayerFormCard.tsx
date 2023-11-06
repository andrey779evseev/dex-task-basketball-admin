import { IPlayer } from '@api/players/dto/IPlayer'
import {
	useCreatePlayerMutation,
	useGetPositionsQuery,
	useUpdatePlayerMutation,
} from '@api/players/playersApi'
import { useGetTeamsQuery } from '@api/teams/teamsApi'
import Breadcrumbs from '@components/ui/breadcrumbs/Breadcrumbs'
import Button from '@components/ui/button/Button'
import DatePicker from '@components/ui/date-picker/DatePicker'
import Input from '@components/ui/input/Input'
import Select from '@components/ui/select/Select'
import UploadImage from '@components/ui/upload-image/UploadImage'
import { addNotificationAction } from '@core/redux/notificationSlice'
import { useAppDispatch } from '@core/redux/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { IPlayerForm } from '@modules/players/interfaces/IPlayerForm'
import { PlayerFormValidator } from '@modules/players/validators/PlayerFormValidator'
import { ROUTES } from '@pages/router'
import { memo, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import s from './PlayerFormCard.module.scss'

interface Props {
	editPlayer?: IPlayer | undefined
}

const PlayerFormCard = memo((props: Props) => {
	const { editPlayer } = props
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IPlayerForm>({
		resolver: zodResolver(PlayerFormValidator),
		defaultValues: {
			name: '',
		},
		values:
			editPlayer !== undefined
				? { ...editPlayer, birthday: new Date(editPlayer.birthday) }
				: undefined,
	})
	const isEdit = useMemo(() => editPlayer !== undefined, [editPlayer])
	const [createPlayer, { isLoading: isCreateLoading }] =
		useCreatePlayerMutation()
	const [updatePlayer, { isLoading: isUpdateLoading }] =
		useUpdatePlayerMutation()
	const { data: positions, isError: isPositionsError } = useGetPositionsQuery()
	const { data: teams, isError: isTeamsError } = useGetTeamsQuery(
		{
			name: '',
			page: 1,
			size: 100,
		},
		{
			skip: isEdit,
		},
	)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const positionOptions = useMemo(() => {
		return (positions ?? []).map((position) => ({
			value: position,
			label: position,
		}))
	}, [positions])

	const teamsOptions = useMemo(() => {
		return (teams?.data ?? []).map((team) => ({
			value: team.id,
			label: team.name,
		}))
	}, [teams])

	const onSubmit = async (data: IPlayerForm) => {
		try {
			if (isEdit)
				await updatePlayer({
					...data,
					id: editPlayer!.id,
					number: data.number ?? 0,
				}).unwrap()
			else await createPlayer({ ...data, number: data.number ?? 0 }).unwrap()
			navigate(isEdit ? ROUTES.Player(editPlayer!.id) : ROUTES.Players)
		} catch (err) {
			console.error(err)
			dispatch(
				addNotificationAction(
					`Something wen't wrong, while ${
						isEdit ? 'updating' : 'creating'
					} player`,
				),
			)
		}
	}

	if (
		positions === undefined ||
		isPositionsError ||
		((teams === undefined || isTeamsError) && !isEdit)
	)
		return null

	return (
		<div className={s.container}>
			<Breadcrumbs
				path={['Players', isEdit ? 'Edit a player' : 'Add new player']}
			/>
			<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
				<Controller
					control={control}
					name='avatarUrl'
					render={({ field: { onChange, value } }) => (
						<UploadImage
							url={value}
							setUrl={onChange}
							error={errors.avatarUrl}
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
					<Controller
						control={control}
						name='position'
						render={({ field: { onChange, value } }) => (
							<Select
								options={positionOptions}
								value={
									value === undefined ? undefined : { value, label: value }
								}
								onChange={(e) => onChange(e?.value)}
								id='position-select'
								label='Position'
								error={errors.position}
							/>
						)}
					/>
					{isEdit ? null : (
						<Controller
							control={control}
							name='team'
							render={({ field: { onChange, value } }) => (
								<Select
									options={teamsOptions}
									value={
										// prettier-ignore
										value === undefined
										? undefined
										: {
												value,
												label: teamsOptions.find(
													(team) => team.value === value,
												)!.label,
                    }
									}
									onChange={(e) => onChange(e?.value)}
									id='team-select'
									label='Team'
									error={errors.team}
								/>
							)}
						/>
					)}
					<div className={s.group}>
						<Controller
							control={control}
							name='height'
							render={({ field: { onChange, value } }) => (
								<Input
									id='height'
									label='Height (cm)'
									value={value}
									onChange={(e) => onChange(parseInt(e) || 0)}
									error={errors.height}
									type='number'
								/>
							)}
						/>
						<Controller
							control={control}
							name='weight'
							render={({ field: { onChange, value } }) => (
								<Input
									id='weight'
									label='Weight (kg)'
									value={value}
									onChange={(e) => onChange(parseInt(e) || 0)}
									error={errors.weight}
									type='number'
								/>
							)}
						/>
						<Controller
							control={control}
							name='birthday'
							render={({ field: { onChange, value } }) => (
								// <Input
								// 	id='birthday'
								// 	label='Birthday'
								// 	value={value}
								// 	onChange={onChange}
								// 	error={errors.birthday}
								// 	type='date'
								// />
								<DatePicker
									value={value}
									onChange={onChange}
									id='birthday'
									label='Birthday'
									error={errors.birthday}
								/>
							)}
						/>
						<Controller
							control={control}
							name='number'
							render={({ field: { onChange, value } }) => (
								<Input
									id='number'
									label='Number'
									value={value}
									onChange={(e) => onChange(parseInt(e) || 0)}
									error={errors.number}
									type='number'
								/>
							)}
						/>
					</div>

					<div className={s.actions}>
						<Link to={isEdit ? ROUTES.Player(editPlayer!.id) : ROUTES.Players}>
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

export default PlayerFormCard
