import store from '../store';
import { actionFullLogin, actionFullRegister } from './auth.actions';

const signInFormHandler = async event => {
  event.preventDefault();
  const formData = Array.from(new FormData(event.target));
  store.dispatch(actionFullLogin(formData[0][1], formData[1][1]));
  event.target.parentElement.classList.remove('active');
  document.querySelector('.overlay').classList.remove('active');
};

const signUpFormHandler = async event => {
  event.preventDefault();
  const formData = Array.from(new FormData(event.target));
  store.dispatch(actionFullRegister(formData[0][1], formData[1][1]));
  event.target.parentElement.classList.remove('active');
  document.querySelector('.overlay').classList.remove('active');
};

document.querySelector('#form-login form').addEventListener('submit', signInFormHandler);
document.querySelector('#form-register form').addEventListener('submit', signUpFormHandler);
