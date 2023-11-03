const base = import.meta.env.VITE_REACT_APP_API

const request = async <T extends Partial<RequestInit>>(
	url: string,
	data: T,
	token: string | undefined,
) => {
	const headers: HeadersInit = {}
	if (token) headers.Authorization = `Bearer ${token}`
	if (typeof data.body === 'string')
		headers['Content-Type'] = 'application/json;charset=utf-8'

	const response = await fetch(url, {
		...data,
		headers,
	})
	if (response.ok) {
		if (response.headers.get('Content-Length') === '0') {
			return true
		}
		const typeResponse = response.headers.get('Content-Type')
		let result
		if (typeResponse === 'application/text') {
			result = await response.text()
			return result
		}
		result = await response.json()
		return result
	}

	throw { isCustomError: true, status: response.status }
}

export const get = (url: string, token?: string) =>
	request(`${base}${url}`, { method: 'GET' }, token)

export function post<T extends BodyInit>(url: string, body: T, token?: string) {
	return request(`${base}${url}`, { method: 'POST', body }, token)
}

export const remove = (url: string, token: string) =>
	request(`${base}${url}`, { method: 'DELETE' }, token)

export function put<T extends BodyInit>(url: string, body: T, token: string) {
	return request(`${base}${url}`, { method: 'PUT', body }, token)
}
