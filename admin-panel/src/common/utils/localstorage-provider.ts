const localStorageProvider = {
  getJwt: () => localStorage.getItem('jwt'),
  setJwt: (jwt: string) => localStorage.setItem('jwt', jwt),
  getRoles: () => localStorage.getItem('roles'),
  setRoles: (roles: string) => localStorage.setItem('roles', roles),
  clear: () => localStorage.clear(),
};

export default localStorageProvider;
