const initialState = {
  user: null,
  errorMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return { ...state, user: action.payload, errorMessage: null };
    case 'SIGNUP_ERROR':
      return { ...state, user: null, errorMessage: action.payload };
    default:
      return state;
  }
};

export default authReducer;
