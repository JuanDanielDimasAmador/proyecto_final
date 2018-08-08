import { combineReducers } from 'redux';

import authReducer from './authreducer';
import errorReducer from './errorreducer';
import profileReducer from './profilereducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer
});