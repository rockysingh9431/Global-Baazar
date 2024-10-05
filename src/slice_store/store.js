import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import cartSliceReducer from "./cartSlice";
import authSliceReducer from "./authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],

  devTools: true,
});

export default store;
