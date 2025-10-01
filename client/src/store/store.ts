import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './api/user';
import { productApi } from './api/product';
import { cartApi } from './api/cart/cart';
import { orderApi } from './api/order/order';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (get) =>
    get().concat(
      userApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      orderApi.middleware
    ),
});
