/**
 * Non-model API response template.
 */
export type ApiResponse<T> = {
  data: T,
  status: number,
};

/**
 * Template for api() interface.
 */
export interface ApiConfig {
  method?: string,
  body?: any,
  headers?: { [header: string]: string },
  status?: number,
}
