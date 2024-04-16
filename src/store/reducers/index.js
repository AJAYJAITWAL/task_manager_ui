import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
  user: userReducer,
});

export default rootReducer;
