/**
 * User credentials supplied in the JWT token.
 */
export type Credentials = {
  jwt: string,
  user_id: number,
  groups: Array<string>,
  username: string,
};
