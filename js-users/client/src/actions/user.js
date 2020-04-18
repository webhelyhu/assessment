import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_USER,
  GET_USERS,
  USER_ERROR,
  UPDATE_FORM_USER,
  CLEAR_USERS
} from './types';

const URL_BASE = '/api/backend';
const headerConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};


// Get all users
export const getUsers = () => async dispatch => {
  dispatch({ type: CLEAR_USERS });

  try {
    const res = await axios.get(`/api/backend`);

    dispatch({
      type: GET_USERS,
      payload: res.data
    });

    console.log("got users")

  } catch (err) {
    console.log("Error getting users")
    // check if the error has "response"
    if (err.response) {
      dispatch({
        type: USER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    } else {
      dispatch({
        type: USER_ERROR,
        payload: { msg: JSON.stringify(err), status: "ERROR" }
      });
    }
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
  // console.log("Creating", formData.first_name)

  try {
    await axios.post(`${URL_BASE}`, formData, headerConfig);
    // console.log("User created")

    // // sending back the new user data (the response from axios) with GET_USER
    // dispatch({
    //   type: GET_USER,
    //   payload: res.data
    // });

    dispatch(setAlert(`User ${formData.first_name} Created`, 'success'));

    // history.push('/');    // where to go after creating user?

  } catch (err) {
    console.log(err)
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
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
    // where to go? we have a history prop if needs redirection.
  } catch (err) {
    dispatch(setAlert(`Error updating user ${first_name}!`, 'danger'));
    console.log("Error updating user", err)

    if (typeof err === 'object' && typeof err.response === 'object') {
      // we got response error, we can get dispatch the error data
      console.log("Sending details to reducer")
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
};




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
