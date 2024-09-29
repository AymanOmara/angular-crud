export interface BaseResponse<T> {
  data: T | null;
  statusCode: number | null;
  messge: string | null;
  success: boolean | null;
}
