import type { BaseResponse } from "../../../types/api";

export type TUser = {
  name: string;
  email: string;
};

export interface TAuthResponse extends BaseResponse {
  user: TUser;
  authToken: string;
}
