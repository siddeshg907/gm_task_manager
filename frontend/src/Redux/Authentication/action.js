
import axios from 'axios';

export const signup = (name, email, password, navigate) => {
  return async (dispatch) => {
    dispatch({ type: 'SIGNUP_REQUEST' });
    try {
      const response = await axios.post('https://good-shoe-cow.cyclic.app/users/register', {
        name,
        email,
        password
      });
      dispatch({ type: 'SIGNUP_SUCCESS' });
      console.log(response.data); // Assuming the response contains necessary data
      navigate('/login');
    } catch (error) {
      dispatch({ type: 'SIGNUP_FAILURE', payload: error.message });
      console.error('Error:', error);
    }
  };
};

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await axios.post('https://good-shoe-cow.cyclic.app/users/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      dispatch({ type: 'LOGIN_SUCCESS' });
      console.log(response.data); // Assuming the response contains necessary data
      navigate('/tasks');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      console.error('Error:', error);
    }
  };
};