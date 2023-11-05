import { api } from '@core/redux/store'

export const imagesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		saveImage: builder.mutation<string, FormData>({
			query: (payload) => ({
				url: 'Image/SaveImage',
				method: 'POST',
				body: payload,
			}),
		}),
	}),
})

export const { useSaveImageMutation } = imagesApi
