import type { Review } from 'types/review';

export type Restaurant = {
  id: number,
  name: string,
  background_image_url: string,
  avg_rating: number,
  reviews?: Array<Review>
};
