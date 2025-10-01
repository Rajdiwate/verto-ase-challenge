import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TAuthResponse, TUser } from './user.types';
import type { SignupSchema } from '../../../components/pages/Signup';
import type { LoginSchema } from '../../../components/pages/Login';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../config/api';

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    signup: builder.mutation<TUser, SignupSchema>({
      query: (data) => ({
        url: '/v1/user/signup',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: TAuthResponse) => {
        Cookies.set('authToken', response.authToken);
        return response.user;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: user } = await queryFulfilled;
        // Update the getUser cache with the user data from login
        dispatch(userApi.util.upsertQueryData('getUser', undefined, user));
      },
    }),
    login: builder.mutation<TUser, LoginSchema>({
      query: (data) => ({
        url: '/v1/user/login',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: TAuthResponse) => {
        Cookies.set('authToken', response.authToken);
        return response.user;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: user } = await queryFulfilled;
        // Update the getUser cache with the user data from login
        dispatch(userApi.util.upsertQueryData('getUser', undefined, user));
      },
    }),

    getUser: builder.query<TUser, void>({
      query: () => ({
        url: '/v1/user/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      }),
      transformResponse: (response: TAuthResponse) => {
        return response.user;
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useGetUserQuery } = userApi;
