import type { BaseResponse } from "../../../types/api";

export interface TCartProduct {
  id: number;
  name: string;
  stock: number;
  img : string;
  quantity : number;
  cartItemId : number;
  price : number;
}

export interface TCartResponse extends BaseResponse {
  products: TCartProduct[];
  totalItems : number;
  totalAmount : number;
}
