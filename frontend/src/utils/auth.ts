import { Credentials } from 'types/credentials';
import { setApiToken } from './api';

export const loadToken = () => {
  setApiToken(window.localStorage.getItem('jwt'));
};

export const setCredentials = ({ jwt }: Credentials) => {
  if (jwt) {
    window.localStorage.setItem('jwt', jwt);
  } else {
    window.localStorage.removeItem('jwt');
  }

  loadToken();
};

export const isUserLoggedIn = () => !!window.localStorage.getItem('jwt');

export const initAuthModule = () => {
  loadToken();
};
