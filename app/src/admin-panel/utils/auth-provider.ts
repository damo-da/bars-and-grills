import api from './api';
import localStorageProvider from 'utils/localstorage-provider';
import { LoginFormData } from 'types/login';

export default {
  login: async ({ username, password }: LoginFormData) => {
    const { json: { token: jwt, roles } } = await api('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    localStorageProvider.setJwt(jwt);
    localStorageProvider.setRoles(roles);
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
  },
  getPermissions: async () => localStorageProvider.getRoles(),
};
