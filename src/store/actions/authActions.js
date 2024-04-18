import axios from 'axios';
import { setToken } from '../../utils/authUtils';

export const signup = (userData) => {

  return async (dispatch) => {
    try {
      const response = await axios.post('/users', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map((msg) => msg);

        dispatch({ type: 'SIGNUP_ERROR', payload: errorMessages });
      } else {
        console.error('Error:', error);
        dispatch({ type: 'SIGNUP_ERROR', payload: ['An error occurred. Please try again.'] });
      }
    }
  };
};

export const login = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setToken(response.data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors;

        dispatch({ type: 'LOGIN_ERROR', payload: errorMessages });
      } else {
        console.error('Error:', error);
        dispatch({ type: 'LOGIN_ERROR', payload: ['Invalid credentials. Please try again.'] });
      }
    }
  };
};
