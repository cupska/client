import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../../features/counter/counterSlice";
import { userServices } from "../../services/user.services";
import { authSevices } from "../../services/auth";
import { productServices } from "../../services/product.services";
import { categoryServices } from "../../services/category.services";
import { pagingSlice } from "../../features/pagination";
import { toastSlice } from "../../features/toastSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    toast: toastSlice.reducer,
    pagination: pagingSlice.reducer,
    [userServices.reducerPath]: userServices.reducer,
    [authSevices.reducerPath]: authSevices.reducer,
    [productServices.reducerPath]: productServices.reducer,
    [categoryServices.reducerPath]: categoryServices.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    const customMiddleware = [
      userServices.middleware,
      authSevices.middleware,
      productServices.middleware,
      categoryServices.middleware,
    ];
    return getDefaultMiddleware().concat(customMiddleware);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
