// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";
import { userSchema } from "../lib/zod-validation/user.validation";

const userType = userSchema.omit({ password: true });
type userSchemaType = z.infer<typeof userType>;

export const userServices = createApi({
  reducerPath: "userServices",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/user",
  }),
  endpoints: (builder) => ({
    checkUsernameChecker: builder.mutation<
      { data: { username: { isExist: boolean } } },
      string
    >({
      query: (username) => ({ url: "/check/" + username, method: "POST" }),
    }),
    profile: builder.query<
      { data: userSchemaType; error: { message: string } },
      null
    >({
      query: () => ({ url: "/profile", credentials: "include" }),
    }),
  }),
});
