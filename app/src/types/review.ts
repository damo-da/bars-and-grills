import type { User } from 'types/user';

/**
 * Review model.
 */
export type Review = {
  id: number,
  comment: string,
  rating: number,
  user: User,
  timestamp: string,
};
