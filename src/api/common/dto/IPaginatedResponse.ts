export interface IPaginatedResponse<T> {
	count: number
	page: number
	size: number
	data: T[]
}
