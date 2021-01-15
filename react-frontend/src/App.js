import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './Store/index';
import { signInUser } from './Store/userActions';

import Main from './Components/Main';
import Navbar from './Components/NavBar';

const store = configureStore();

function App() {
	useEffect(() => {
		if (localStorage.userToken) {
			const { token, user } = JSON.parse(localStorage.userToken);
			try {
				store.dispatch(signInUser(user, token));
			} catch (error) {
				store.dispatch(signInUser({}, false));
			}
		}
	});
	return (
		<div>
			<Provider store={store}>
				<BrowserRouter>
					<Navbar />
					<Main />
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
