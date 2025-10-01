import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TProduct, TProductResponse } from './product.types';
import { API_BASE_URL } from '../../../config/api';

export const productApi = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<TProduct[], {limit?: number , page?: number}>({
      query: ({limit , page}) => ({
        url: '/v1/product',
        method: 'GET',
        params: {
          limit,
          page,
        },
      }),
      transformResponse: (response: TProductResponse) => {
        return response.products;
      },
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
