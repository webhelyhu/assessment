import {
  GET_USER,
  USER_ERROR,
  GET_USERS,
  UPDATE_USER,
  CLEAR_USERS,
  UPDATE_FORM_USER
} from '../actions/types';


const initialState = {
  user: {
    first_name: '',
    last_name: '',
    status: 'active'
  },
  users: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:            // payload is the user
      console.log('Got user', payload.first_name)
      return {
        ...state,
        user: payload,
        loading: false
      };
    case UPDATE_USER:      // payload is only the id of the updated user!
      return {
        ...state,
        loading: false
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: true
      };
    case UPDATE_FORM_USER:
      return {
        ...state,
        user: { ...state.user, ...payload }
      }
    default:
      return state;
  }
}
