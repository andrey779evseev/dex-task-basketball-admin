export const useBodyOverflow = () => {
	return {
		showOverflow: () => {
			document.body.style.overflow = 'unset'
		},
		hideOverflow: () => {
			document.body.style.overflow = 'hidden'
		},
	}
}
