/**
 * Non-model API response template.
 */
export type ApiResponse<T> = {
  data: T,
  status: number,
};
