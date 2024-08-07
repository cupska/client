// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";
import {
  loginSchema,
  registerSchema,
} from "../lib/zod-validation/user.validation";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const authSevices = createApi({
  reducerPath: "authServices",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/auth",
  }),
  endpoints: (builder) => ({
    registration: builder.mutation<unknown, z.infer<typeof registerSchema>>({
      query: (body) => ({
        url: "/registration",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<
      { data: { user: { fullname: string; id: string; role: string } } },
      z.infer<typeof loginSchema>
    >({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "post",
        credentials: "include",
        responseHandler: (res) => res.text(),
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
