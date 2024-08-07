// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const userServices = createApi({
  reducerPath: "userServices",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/user",
  }),
  endpoints: (builder) => ({
    // checkUsernameChecker: builder.query<
    //   { data: { username: { isExist: boolean } } },
    //   string
    // >({
    //   query: (username) => `/check/${username}`,
    // }),
    checkUsernameChecker: builder.mutation<
      { data: { username: { isExist: boolean } } },
      string
    >({
      query: (username) => ({ url: "/check/" + username, method: "POST" }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useCheckUsernameExistQuery } = userServices;
