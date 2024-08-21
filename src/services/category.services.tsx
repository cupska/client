// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 
export const categoryServices = createApi({
  reducerPath: "categoryServices",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/category",
  }),
  endpoints: (builder) => ({
    getCategory: builder.query<
      { data: { id: number; name: string }[] },
      unknown
    >({
      query: () => ({ url: "/" }),
    }),
  }),
});
