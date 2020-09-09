const localStorageProvider = {
  getJwt: () => localStorage.getItem('jwt'),
  setJwt: (jwt: string) => localStorage.setItem('jwt', jwt),

  getGroups: () => localStorage.getItem('groups'),
  setGroups: (roles: string) => localStorage.setItem('groups', roles),

  getUserId: () => parseInt(localStorage.getItem('userId') || '', 10),
  setUserId: (userId: number) => localStorage.setItem('userId', userId.toString()),

  getUsername: () => localStorage.getItem('username'),
  setUsername: (username: string) => localStorage.setItem('username', username),

  clear: () => localStorage.clear(),
};

export default localStorageProvider;
