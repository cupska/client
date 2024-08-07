import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  user: { id: string; fullname: string };
} = {
  user: {
    id: localStorage.getItem("id") ?? "",
    fullname: localStorage.getItem("fullname") ?? "",
  },
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(
      state,
      { payload }: { payload: { user: typeof initialState.user } }
    ) {
      state.user = payload.user;
      localStorage.setItem("id", state.user.id);
      localStorage.setItem("fullname", state.user.fullname);
    },
    clearSession(state) {
      localStorage.removeItem("id");
      localStorage.removeItem("fullname");
      state.user = initialState.user;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
