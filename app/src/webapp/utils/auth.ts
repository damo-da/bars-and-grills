import type { Credentials } from 'types/credentials';
import history from 'utils/history';
import { setApiToken } from 'webapp/utils/api';

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

export const redirectIfNotLoggedIn = () => {
  if (!isUserLoggedIn()) {
    history.replace('/login');
  }
};
