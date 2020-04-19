import {
  GET_USER,
  CLEAR_USER,
  USER_ERROR,
  GET_USERS,
  UPDATE_USER,
  CLEAR_USERS,
  UPDATE_FORM_USER
} from '../actions/types';


const naplo = (...props) => console.log(...props)

const initialState = {
  user: {
    first_name: '',
    last_name: '',
    status: 'active'
  },
  loadingUser: true,   // the selected user is not yet loaded from server?
  users: [],
  loading: true,       // the whole userslist is missing?
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:            // payload is the user
      naplo('reducer: GET_USER', payload)
      return {
        ...state,
        user: { ...payload },
        error: {},
        loadingUser: false,
      };
    case CLEAR_USER:          // clearing user data, prepare for add new user.
      console.log("reducer: CLEAR_USER", initialState.user)
      return {
        ...state,
        user: {
          first_name: '',
          last_name: '',
          status: 'active'
        },
        error: {},
        loadingUser: false   // we do not need to load a cleared user.
      };
    case UPDATE_USER:      // payload is only the id of the updated user!
      naplo('reducer: UPDATE_USER', payload)
      return {
        ...state,
        error: {},
        loadingUser: false
      };
    case GET_USERS:
      naplo('reducer: GET_USERS lines:', payload.length)
      return {
        ...state,
        users: payload,
        error: {},
        loading: false
      };
    case USER_ERROR:     // when user update/create returns error messages from server. see at actions/user
      naplo('reducer: USER_ERROR', payload)
      return {
        ...state,
        error: payload,
        loadingUser: false
      };
    case CLEAR_USERS:
      naplo('reducer: CLEAR_USERS', payload)
      return {
        ...state,
        error: {},
        users: [],
        loading: true
      };
    case UPDATE_FORM_USER:
      // naplo('reducer: UPDATE_FORM_USER', payload)
      return {
        ...state,
        user: { ...state.user, ...payload }
      }
    default:
      return state;
  }
}
