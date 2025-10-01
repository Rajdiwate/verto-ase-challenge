export interface BaseResponse {
  success: true;
  message: string;
}

export interface BaseError {
  success: false;
  message: string;
}
