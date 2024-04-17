const initialState = {
  loggedIn: false,
  user: null,
  errorMessage: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, loggedIn: true, user: action.payload, errorMessage: null };
    case 'LOGIN_ERROR':
      return { ...state, loggedIn: false, errorMessage: action.payload };
    case 'SET_TOKEN':
      return { ...state, loggedIn: true, user: action.payload, errorMessage: null };
    case 'LOGOUT':
      return { ...state, loggedIn: false, user: null, errorMessage: null };
    default:
      return state;
  }
};

export default loginReducer;
