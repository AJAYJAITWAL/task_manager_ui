const initialState = {
  loggedIn: false,
  user: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, loggedIn: true, user: action.payload, error: null };
    case 'LOGIN_ERROR':
      return { ...state, loggedIn: false, error: action.payload };
    case 'SET_TOKEN':
      return { ...state, loggedIn: true, user: action.payload, error: null };
    case 'LOGOUT':
      return { ...state, loggedIn: false, user: null, error: null };
    default:
      return state;
  }
};

export default loginReducer;
