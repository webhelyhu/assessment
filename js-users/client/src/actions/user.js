import axios from 'axios';
import { setAlert } from './alert';
import naplo from '../utils/naplo'

import {
  GET_USER,
  CLEAR_USER,
  GET_USERS,
  USER_ERROR,
  UPDATE_USER,
  UPDATE_FORM_USER,
  CLEAR_USERS
} from './types';

const URL_BASE = '/api/backend';
const headerConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};


//
// util: handling error at axios requests
//
const handleAxiosError = (dispatch, err = {}, message) => {
  // setAlert for the frontend
  message && dispatch(setAlert(message, 'danger'));

  if (typeof err === 'object' && typeof err.response === 'object') {
    // we got response error, we can get dispatch the error data
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
        ...err.response.data
      }
    });
  } else {
    // we have no extra info from response object, but need to dispatch ERROR anyways.
    dispatch({
      type: USER_ERROR,
      payload: { msg: JSON.stringify(err), status: "ERROR" }
    })
  }
}



// Get all users
export const getUsers = () => async dispatch => {
  naplo("getUsers starts")
  dispatch({ type: CLEAR_USERS });

  try {
    const res = await axios.get(`/api/backend`);
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    naplo("Error getting users")
    handleAxiosError(dispatch, err)
  }
};

// Get user by ID
export const getUserById = userId => async dispatch => {
  naplo("getUserById starts, parameter:", userId)
  // naplo('getUserById ', `${URL_BASE}/${userId}`)

  if (!userId) {
    naplo("...assuming new user creation")
    dispatch({ type: CLEAR_USER });
    return
  }

  try {
    const res = await axios.get(`${URL_BASE}/${userId}`, headerConfig);
    naplo('Loaded user', userId)
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    naplo('User not loaded')
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Create user
export const createUser = (
  formData,
  history
) => async dispatch => {
  try {
    const answer = await axios.post(`${URL_BASE}`, formData, headerConfig);
    dispatch(setAlert(`User ${formData.first_name} Created`, 'success'));
    naplo("newuser returned:", answer.data.id)
    //
    // what to do after creating new user? stay and clear form or jump to table?
    //
    history.push(`/edit/${answer.data.id}`);
    //
    // dispatch({
    //   type: GET_USER,
    //   payload: answer.data
    // });
  } catch (err) {
    handleAxiosError(dispatch, err, 'Error creating user')
  }
};


// Update user
export const updateUser = (
  formData
) => async dispatch => {
  const { id, first_name, last_name, status } = formData
  const updateInfo = { first_name, last_name, status }
  // naplo("updateUser with", updateInfo)
  try {
    await axios.patch(`${URL_BASE}/${id}`, updateInfo, headerConfig);
    dispatch(setAlert(`User ${first_name} updated`, 'success'));
    dispatch({
      type: UPDATE_USER
      // payload:    // we do not need to send payload. Server responds with nothing.
    })
    // where to go? we have a history prop if needs redirection.
  } catch (err) {
    handleAxiosError(dispatch, err, `Error updating user ${first_name}!`)
  }
};

// dispatch(setAlert(`Error updating user ${first_name}!`, 'danger'));
// naplo("Error updating user", err)

// if (typeof err === 'object' && typeof err.response === 'object') {
//   // we got response error, we can get dispatch the error data
//   naplo("Sending details to reducer")
//   dispatch({
//     type: USER_ERROR,
//     payload: {
//       msg: err.response.statusText,
//       status: err.response.status,
//       ...err.response.data
//     }
//   });
// } else {
//   // we have no extra info from response object, but need to dispatch ERROR anyways.
//   dispatch({
//     type: USER_ERROR,
//     payload: { msg: JSON.stringify(err), status: "ERROR" }
//   })
// }









// Update only the status of the user
export const updateUserStatus = (
  { id, status }
) => async dispatch => {
  naplo("updateUserStatus at user", id, " to status ", status)
  try {
    await axios.patch(`${URL_BASE}/${id}`, { status }, headerConfig);
    // data has changed, reload needed
    dispatch(getUsers());

  } catch (err) {
    dispatch(setAlert(`Error updating user ${id}!`, 'danger'));
    naplo("Error updating user", err)
  }
};

export const updateFormUser = (payload) =>
  async dispatch => {
    dispatch({ type: UPDATE_FORM_USER, payload })
  }
