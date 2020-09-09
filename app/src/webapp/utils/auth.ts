import type { Credentials } from 'types/credentials';
import history from 'utils/history';
import { setApiToken } from 'webapp/utils/api';
import localStorageProvider from 'utils/localstorage-provider';

export const loadToken = () => {
  setApiToken(localStorageProvider.getJwt());
};

export const setCredentials = ({
  jwt, user_id, groups, username,
}: Credentials) => {
  localStorageProvider.setJwt(jwt);
  localStorageProvider.setUserId(user_id);
  localStorageProvider.setGroups(groups.join(','));
  localStorageProvider.setUsername(username);

  loadToken();
};

export const isUserLoggedIn = () => !!localStorageProvider.getJwt();

export const initAuthModule = () => {
  loadToken();
};

export const redirectIfNotLoggedIn = () => {
  if (!isUserLoggedIn()) {
    history.replace('/login');
  }
};
