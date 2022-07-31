import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { userDto } from "../../interfaces";
import { doSignin, doSigninByToken, doLogout, doSignup } from "./authAPI";

export interface AuthState {
  currentUser: userDto | null;
  status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  currentUser: null,
  status: "idle",
};

export const signinAsync = createAsyncThunk(
  "auth/signin",
  async (data: { name: string; password: string }) => {
    const response = await doSignin(data);
    return response.data;
  }
);

export const signinByTokenAsync = createAsyncThunk(
  "auth/signinbytoken",
  async () => {
    const response = await doSigninByToken();
    return response?.data;
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (currentUser: userDto) => {
    const response = await doLogout(currentUser);
    return response.data;
  }
);

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (data: {
    name: string;
    password: string;
    role: string;
    title: string;
    description: string;
  }) => {
    const response = await doSignup(data);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signinAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signinAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = action.payload.data;
        localStorage.setItem("_token", action.payload.token);
      })
      .addCase(signinAsync.rejected, (state) => {
        state.status = "failed";
        state.currentUser = null;
      })
      .addCase(signinByTokenAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signinByTokenAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          state.currentUser = action.payload.data;
          localStorage.setItem("_token", action.payload.token);
        }
      })
      .addCase(signinByTokenAsync.rejected, (state) => {
        state.status = "failed";
        state.currentUser = null;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = null;
        localStorage.removeItem("_token");
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

export default authSlice.reducer;
