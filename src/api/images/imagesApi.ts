import { api } from '@api/common/api'
import { IDeleteImageRequest } from './dto/IDeleteImageReauest'

export const imagesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		saveImage: builder.mutation<string, FormData>({
			query: (payload) => ({
				url: 'Image/SaveImage',
				method: 'POST',
				body: payload,
			}),
		}),
		deleteImage: builder.mutation<void, IDeleteImageRequest>({
			query: (payload) => ({
				url: 'Image/DeleteImage',
				method: 'DELETE',
				params: payload,
			}),
		}),
	}),
})

export const { useSaveImageMutation, useDeleteImageMutation } = imagesApi
