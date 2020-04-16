import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import user from './user';
import post from './post';

export default combineReducers({
  alert,
  auth,
  profile,
  user,
  post
});
