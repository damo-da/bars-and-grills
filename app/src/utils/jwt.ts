import jwtDecode from 'jwt-decode';
import type { Credentials } from 'types/credentials';

// eslint-disable-next-line import/prefer-default-export
export const decodeJwt = (jwt: string): Credentials => ({
  ...jwtDecode(jwt),
  jwt,
});
