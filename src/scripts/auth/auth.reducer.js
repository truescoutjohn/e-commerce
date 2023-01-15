import { AUTH_LOGIN, AUTH_LOGOUT } from './auth.actions';

const authReducer = (state = { userData: {} }, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return { ...state, userData: { user: action.payload.user, token: action.payload.token } };
    case AUTH_LOGOUT: {
      const copyState = { ...state };
      delete copyState.userData;
      return copyState;
    }
    default:
      return state;
  }
};

export default authReducer;
