import 'whatwg-fetch';

export function getUser() {
	return fetch('/auth/getUserStatus', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({

		})
	}).then((res) => {
		return res.json();
	});
}