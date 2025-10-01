import type { BaseResponse } from '../../../types/api';

export interface TProduct {
  id: number;
  name: string;
  stock: number;
  price: number;
  img: string;
}

export interface TProductResponse extends BaseResponse {
  products: TProduct[];
}
