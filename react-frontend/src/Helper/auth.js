import axios from 'axios';

function setTokenHeader(token) {
	if (token) {
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
}

function authUser(username, password) {
	return new Promise((res, rej) => {
		return axios
			.get('http://localhost:8080/login', {
				auth: {
					username: username,
					password: password
				}
			})
			.then(() => {
				const user = {
					username: username
				};
				const token = `Basic ${btoa(username + ':' + password)}`;
				// signInUser(user, token);
				const response = {
					user,
					token
				};
				return res(response);
			})
			.catch(error => rej());
	});
}

export { authUser, setTokenHeader };
