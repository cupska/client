import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

type payload = { elm: ReactNode; status: "error" | "success" };
const initialState: {
  contents: payload[];
} = { contents: [] };

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<payload>) {
      state.contents.push(action.payload);
    },
    popToast(state) {
      state.contents.shift();
    },
  },
});

export const { addToast, popToast } = toastSlice.actions;
