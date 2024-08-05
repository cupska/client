import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { AppDispatch, RootState } from "../lib/redux/store";

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

export const setPopTime = createAsyncThunk<
  void,
  void,
  { state: RootState; dispatch: AppDispatch }
>("toast/setPoptime", async (_, { dispatch }) => {
  setTimeout(() => {
    dispatch(toastSlice.actions.popToast());
  }, 9000);
});
