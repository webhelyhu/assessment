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
  try {

    await axios.patch(`${URL_BASE}/users/${formData.id}`, formData, headerConfig);

    // const res = await axios.patch(`${URL_BASE}/users/${formData.id}`, formData, config);
    //
    // The server for a good PATCH will answer with "204 No Content"
    // so we cannot dispatch res.data (will be empty)
    // so no need to dispatch here.
    //
    // dispatch({
    //   type: UPDATE_USER,
    //   payload: 
    // });

    dispatch(setAlert(`User ${formData.first_name} updated`, 'success'));

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    // sending err info:
    let msg, status
    if (
      typeof err !== 'undefined'
      && typeof err.response !== 'undefined'
      && typeof err.response.statusText !== 'undefined'
    ) {
      msg = "Error " + err.response.statusText
      status = err.response.status
    } else {
      msg = "Error (no description)"
      status = 500
    }
    dispatch({
      type: USER_ERROR,
      payload: { msg, status }
    });
  }
};



export const updateFormUser = (payload) =>
  async dispatch => {
    dispatch({ type: UPDATE_FORM_USER, payload })
  }
