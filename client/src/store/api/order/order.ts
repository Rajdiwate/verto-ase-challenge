import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import type { TOrder, TOrderResponse } from './order.types';
import { API_BASE_URL } from '../../../config/api';

export const orderApi = createApi({
  reducerPath: 'order',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<TOrder, number[]>({
      query: (data) => ({
        url: '/v1/order',
        method: 'POST',
        body : {
          items : data
        },
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      }),
      transformResponse: (response: TOrderResponse) => {
        return response.order;
      },
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
