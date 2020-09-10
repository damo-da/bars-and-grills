import type { LoginFormData } from 'types/login';
import localStorageProvider from 'utils/localstorage-provider';
import api from 'admin-panel/utils/api';
import { decodeJwt } from 'utils/jwt';

export default {
  login: async ({ username, password }: LoginFormData) => {
    const { json: { token: jwt } } = await api('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const payload = decodeJwt(jwt);

    localStorageProvider.setJwt(jwt);
    localStorageProvider.setUserId(payload.user_id);
    localStorageProvider.setGroups(payload.groups.join(','));
    localStorageProvider.setUsername(payload.username);
  },
  logout: async () => {
    localStorageProvider.clear();
  },
  checkError: async ({ status }: { status: number }) => {
    if (status === 401) {
      localStorageProvider.clear();

      throw Error('You are unauthenticated. Please try again.');
    }
  },
  checkAuth: async () => {
    const jwt = localStorageProvider.getJwt();
    if (!jwt) {
      throw Error('You are not logged in.');
    }
    return true;
  },
  getPermissions: async () => localStorageProvider.getGroups(),
};
