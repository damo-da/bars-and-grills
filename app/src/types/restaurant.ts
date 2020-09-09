import type { Review } from 'types/review';

/**
 * Restaurant Model.
 */
export type Restaurant = {
  id: number,
  name: string,
  background_image_url: string,
  avg_rating: number,
  reviews?: Array<Review>
};
