import { combineReducers } from 'redux';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({ userReducer, cartReducer });

export default rootReducer;
