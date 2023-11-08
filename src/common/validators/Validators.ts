import { urlRegexPattern } from '@helpers/urlRegexPattern'

export const Validators = {
	Required: 'Required',
	MinLength: (value: number) => ({
		value,
		message: `The length must be at least ${value} symbols`,
	}),
	MaxLength: (value: number) => ({
		value,
		message: `The length must not be more than ${value} symbols`,
	}),
	Min: (value: number) => ({
		value,
		message: `The value must be at least ${value}`,
	}),
	Max: (value: number) => ({
		value,
		message: `The value must not be more than ${value}`,
	}),
	Url: {
		value: urlRegexPattern,
		message: 'The value is not a valid url',
	},
}
