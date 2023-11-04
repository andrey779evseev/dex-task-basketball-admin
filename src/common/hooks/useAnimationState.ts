import { useEffect, useState } from 'react'

export const useAnimationState = (value: boolean) => {
	const [internalValue, setInternalValue] = useState(value)

	useEffect(() => {
		if (!value) {
			const timeout = setTimeout(() => setInternalValue(false), 500)
			return () => clearTimeout(timeout)
		} else setInternalValue(true)
	}, [value, setInternalValue])

	return internalValue
}
