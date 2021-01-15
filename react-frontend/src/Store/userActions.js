import { setTokenHeader } from '../Helper/auth';

export function setCurrentUser(user) {
	return {
		type: 'setCurentUser',
		user
	};
}

export function signInUser(user, token) {
	return dispatch => {
		const isAdmin = user.username === 'admin';
		const userInfo = {
			user,
			token,
			isAdmin
		};
		localStorage.setItem('userToken', JSON.stringify(userInfo));
		setTokenHeader(token);
		dispatch(setCurrentUser(userInfo));
	};
}

export function logOutUser() {
	return dispatch => {
		localStorage.clear();
		setTokenHeader(false);
		dispatch(setCurrentUser({}));
	};
}
