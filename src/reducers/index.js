import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  survey: surveyReducer
});