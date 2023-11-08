import { useLayoutEffect } from 'react'

export const useLockBodyScroll = (active: boolean = true) => {
	useLayoutEffect(() => {
		if (!active) return
		const originalStyle = window.getComputedStyle(document.body).overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = originalStyle
		}
	}, [active])
}
