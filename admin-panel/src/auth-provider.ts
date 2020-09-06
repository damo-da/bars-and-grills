import {
  AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK,
} from 'react-admin';
import api, { setApiToken } from 'common/utils/api';

export default (type, params) => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const { username, password } = params;

    return api.post('/login', {
      username,
      password,
    }).then((x) => {
      const { jwt } = x;

      localStorage.setItem('jwt', jwt);

      setApiToken(jwt);
    });
  }
  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('jwt');
    setApiToken(null);
    return Promise.resolve();
  }
  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401) {
      localStorage.removeItem('jwt');
      setApiToken(null);
      return Promise.reject();
    }
    return Promise.resolve();
  }
  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setApiToken(jwt);
      return Promise.resolve();
    }
    return Promise.reject();
  }
  return Promise.reject(new Error('Unknown method'));
};
