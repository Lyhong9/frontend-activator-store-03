export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginationMeta {
  total: number;
  limit: number;
  page?: number;
  prevPage?: number;
  nextPage?: number;
  totalPages?: number;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  pagination: PaginationMeta;
}

export interface PayWayCheckout {
  method: string;
  action: string;
  target: string;
  fields: Record<string, string | number | boolean | null | undefined>;
}
