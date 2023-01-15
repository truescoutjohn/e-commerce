import { signIn, signUp } from '../gateway/authentication';

export const AUTH_LOGIN = 'AUTH/LOGIN';
export const AUTH_LOGOUT = 'AUTH/LOGOUT';

export const actionAuthLogin = ({ token, user }) => ({
  type: AUTH_LOGIN,
  payload: { token, user },
});
export const actionAuthLogout = () => ({ type: AUTH_LOGOUT });

export const actionFullLogin = (login, password) => async dispatch => {
  const token = await signIn(login, password);
  if (!localStorage.getItem('token')) {
    localStorage.setItem('token', token.token);
  }
  await dispatch(actionAuthLogin(token));
};

export const actionFullRegister = (login, password) => async dispatch => {
  const response = await signUp(login, password);
  if (!response.ok) {
    return;
  }

  const token = await signIn(login, password);
  if (!localStorage.getItem('token')) {
    localStorage.setItem('token', token.token);
  }
  await dispatch(actionAuthLogin(token));
};
