import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TCartResponse } from './cart.types';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../config/api';

export const cartApi = createApi({
  reducerPath: 'cart',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getCartProducts: builder.query<Omit<TCartResponse, 'success' | 'message'>, void>({
      query: () => ({
        url: '/v1/cart',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      }),
      transformResponse: (response: TCartResponse) => {
        return {
          products: response.products,
          totalItems: response.totalItems,
          totalAmount: response.totalAmount,
        };
      },
      providesTags: ['Product'],
    }),
    addToCart: builder.mutation<void, { productId: number }>({
      query: ({ productId }) => ({
        url: '/v1/cart',
        method: 'POST',
        body: { productId, quantity: 1 },
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      }),
      invalidatesTags: ['Product'],
    }),
    updateQuantity: builder.mutation<void, { cartItemId: number, quantity: number }>({
      query: ({ cartItemId, quantity }) => ({
        url: '/v1/cart',
        method: 'PATCH',
        body: { cartItemId, quantity },
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const { useGetCartProductsQuery, useAddToCartMutation, useUpdateQuantityMutation } = cartApi;
