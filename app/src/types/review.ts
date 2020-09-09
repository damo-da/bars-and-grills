import type { User } from 'types/user';

export type Review = {
  id: number,
  comment: string,
  rating: number,
  user: User,
  timestamp: Date,
};
