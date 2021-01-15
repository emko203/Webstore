import reducer from './rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export function configureStore() {
	const store = createStore(reducer, compose(applyMiddleware(thunk)));
	return store;
}
