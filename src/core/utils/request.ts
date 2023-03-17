export const getHeader = (token: string): HeadersInit => {
	if (!token) return {};
	return {
		Authorization: `Bearer ${token}`
	};
};

export const getRequest = async (url: string, token = ''): Promise<any> => {
	const result = await fetch(url, {
		headers: getHeader(token)
	});
	if (!result.ok) {
		throw await result.json();
	}
	return await result.json();
};

export const deleteRequest = async (url: string, token = ''): Promise<Response> => {
	const result = await fetch(url, {
		method: 'DELETE',
		headers: getHeader(token)
	});

	if (!result.ok) {
		throw await result.json();
	}
	return result.json();
};

export const postRequest = async (url: string, body: unknown, token = ''): Promise<Response> => {
	const result = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			...getHeader(token)
		}
	});

	if (!result.ok) {
		throw await result.json();
	}
	return result.json();
};

export const putRequest = async (url: string, body: unknown, token = ''): Promise<Response> => {
	const result = await fetch(url, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			...getHeader(token)
		}
	});

	if (!result.ok) {
		throw await result.json();
	}
	return result.json();
};
