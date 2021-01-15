const defaultState = {
	isAuthenticated: false,
	user: {}
};

// eslint-disable-next-line
export default function(state = defaultState, action) {
	switch (action.type) {
		case 'setCurentUser':
			return {
				isAuthenticated: Boolean(Object.keys(action.user).length),
				user: action.user
			};
		default:
			return state;
	}
}
