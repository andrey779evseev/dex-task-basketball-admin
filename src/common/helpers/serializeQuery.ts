export const serializeQuery = <T extends Record<string, any>>(obj: T) => {
	const str = []
	for (const p in obj) {
		if (p in obj === false) continue

		if (Array.isArray(obj[p]))
			obj[p].forEach((x: any) =>
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(x)),
			)
		else str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
	}
	return str.join('&')
}
