import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doApproveUser, doGetUsers } from "./userAPI";

import { userDto } from "../../interfaces";
import { RootState } from "../../app/store";

export interface userState {
  users: Array<userDto>;
  user: userDto | null;
  status: "idle" | "loading" | "failed";
}

const initialState: userState = {
  users: [],
  user: null,
  status: "idle",
};

export const getUsersAsync = createAsyncThunk("get_users", async () => {
  const response = await doGetUsers();
  return response.data;
});

export const approveUserAsync = createAsyncThunk(
  "approve_user",
  async (userId: Number) => {
    const response = await doApproveUser(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload.data;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(approveUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(approveUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload.data;
      })
      .addCase(approveUserAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const seelctUsers = (state: RootState) => state.user.users;
export const selectUserOne = (state: RootState) => state.user.user;

export default userSlice.reducer;
