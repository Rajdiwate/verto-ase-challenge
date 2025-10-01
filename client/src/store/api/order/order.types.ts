import type { BaseResponse } from '../../../types/api';

export interface TOrder {
  id: number;
  userId: number;
  status: string;
}
export interface TOrderResponse extends BaseResponse {
  order: TOrder;
}
