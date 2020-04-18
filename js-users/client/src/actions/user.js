import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_USER,
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
  dispatch({ type: CLEAR_USERS });

  try {
    const res = await axios.get(`/api/backend`);
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    console.log("Error getting users")
    handleAxiosError(dispatch, err)
  }
};

// Get user by ID
export const getUserById = userId => async dispatch => {
  console.log('getUserById ', `${URL_BASE}/${userId}`)
  try {
    const res = await axios.get(`${URL_BASE}/${userId}`, headerConfig);
    console.log('Loaded user', userId)
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
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
    await axios.post(`${URL_BASE}`, formData, headerConfig);
    dispatch(setAlert(`User ${formData.first_name} Created`, 'success'));
    // history.push('/');    // where to go after creating user?
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
  console.log("updateUser with", updateInfo)
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
// console.log("Error updating user", err)

// if (typeof err === 'object' && typeof err.response === 'object') {
//   // we got response error, we can get dispatch the error data
//   console.log("Sending details to reducer")
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
  console.log("updateUserStatus at user", id, " to status ", status)
  try {
    await axios.patch(`${URL_BASE}/${id}`, { status }, headerConfig);
    // data has changed, reload needed
    dispatch(getUsers());

  } catch (err) {
    dispatch(setAlert(`Error updating user ${id}!`, 'danger'));
    console.log("Error updating user", err)
  }
};

export const updateFormUser = (payload) =>
  async dispatch => {
    dispatch({ type: UPDATE_FORM_USER, payload })
  }
