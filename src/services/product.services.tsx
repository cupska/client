import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";
import {
  addProductSchema,
  productSchema,
  updateProductSchema,
} from "../lib/zod-validation/product.validation";
import { addToast } from "../features/toastSlice";

// Define a service using a base URL and expected endpoints
export const productServices = createApi({
  reducerPath: "productServices",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/products",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    addProducts: builder.mutation<unknown, z.infer<typeof addProductSchema>>({
      query: (body) => ({
        url: "/",
        method: "post",
        body,
      }),
      invalidatesTags: ["products"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            addToast({ elm: "Berhasil tambah produk", status: "success" })
          );
        } catch (error) {
          dispatch(addToast({ elm: "Gagal tambah produk", status: "error" }));
        }
      },
    }),
    updateProduct: builder.mutation<
      undefined,
      { payload: Partial<z.infer<typeof updateProductSchema>> } & {
        productId: string;
      }
    >({
      query: ({ productId, payload }) => ({
        url: "/" + productId,
        method: "put",
        body: payload,
      }),
      invalidatesTags: ["products"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            addToast({ elm: "Berhasil update produk", status: "success" })
          );
        } catch (error) {
          dispatch(addToast({ elm: "Gagal update produk", status: "error" }));
        }
      },
    }),
    getProducts: builder.query<
      {
        data: (z.infer<typeof productSchema> & { category_name: string })[];
        paging: { page: number; limit: number; totalRow: number };
      },
      {
        paging: {
          limit?: number;
          page?: number;
          title?: string;
          category?: number;
        };
      }
    >({
      query: (arg) => ({
        url: "/",
        method: "GET",
        params: arg.paging,
        credentials: "include",
      }),
      providesTags: ["products"],
    }),
    getProductById: builder.query<
      { data: z.infer<typeof productSchema> & { [key: string]: unknown } },
      string
    >({
      query: (id) => ({
        url: "/" + id,
      }),
      providesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: "/" + id, method: "delete" }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            addToast({ elm: "Berhasil hapus produk", status: "success" })
          );
        } catch (error) {
          dispatch(addToast({ elm: "Gagal hapus produk", status: "error" }));
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
