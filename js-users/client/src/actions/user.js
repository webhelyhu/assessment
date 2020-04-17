import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_USER,
  GET_USERS,
  USER_ERROR,
  UPDATE_USER,
  CLEAR_USERS
} from './types';

const URL_BASE = '/api/backend';


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
  try {
    const res = await axios.get(`${URL_BASE}/users/${userId}`);

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
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(`${URL_BASE}`, formData, config);
    // console.log("User created")
    // console.log(res)

    // // sending back the new user data (the response from axios) with GET_USER
    // dispatch({
    //   type: GET_USER,
    //   payload: res.data
    // });

    dispatch(setAlert(`User ${formData.first_name} Created`, 'success'));

    // history.push('/dashboard');    // where to go after creating user?

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
export const UpdateUser = (
  formData
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // ASSUME id is in formData.id !!!! chk!

    await axios.patch(`${URL_BASE}/users/${formData.id}`, formData, config);

    // const res = await axios.patch(`${URL_BASE}/users/${formData.id}`, formData, config);
    //
    // The server for a goog PATCH will answer with "204 No Content"
    // so we cannot dispatch res.data (will be empty)
    // so will send the userId back
    //
    dispatch({
      type: UPDATE_USER,
      payload: formData.id
    });

    dispatch(setAlert('User Updated', 'success'));

  } catch (err) {
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

