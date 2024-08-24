// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";
import {
  loginSchema,
  registerSchema,
} from "../lib/zod-validation/user.validation";

export const authServices = createApi({
  reducerPath: "authServices",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/auth",
  }),
  tagTypes: ["authorize"],
  endpoints: (builder) => ({
    registration: builder.mutation<unknown, z.infer<typeof registerSchema>>({
      query: (body) => ({
        url: "/registration",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<
      { data: { message: string }; error: { message: string } },
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
      invalidatesTags: ["authorize"],
    }),
    session: builder.query<
      { isAuthenticated: boolean; id: string; fullname: string },
      null
    >({
      query: () => ({ url: "/session", credentials: "include" }),
      transformResponse: (response: {
        data: {
          isAuthenticated: boolean;
          id: string;
          fullname: string;
        };
      }) => response.data,
      providesTags: ["authorize"],
    }),
  }),
});
