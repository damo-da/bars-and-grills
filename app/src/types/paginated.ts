/**
 * Paginated response supplied by Django Rest Framework API.
 */
export type Paginated<T> = {
  count: number,
  results: Array<T>,
};
