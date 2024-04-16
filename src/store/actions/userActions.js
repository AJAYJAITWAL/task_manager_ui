import axios from 'axios';

export const fetchUsers = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/users', {
        headers: {
          Authorization: `${token}`,
        },
      });
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
      dispatch({ type: 'FETCH_USERS_ERROR', payload: error.message });
    }
  };
};
