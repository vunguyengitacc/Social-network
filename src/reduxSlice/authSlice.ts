import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import { ILoginFormValues } from "../components/Login/Login";
import { IResponse } from "../models/common";
import { initialUser, IUser } from "../models/user";
import { IRegisterFormValues } from "../components/Register/Register";

interface IAuthState {
  currentUser: IUser;
  isAuth: boolean;
}

export const getMe = createAsyncThunk("auth/getMe", async () => {
  const response = await authApi.getMe();
  return response;
});

export const login = createAsyncThunk(
  "auth/login",
  async (payload: ILoginFormValues, thunkAPI) => {
    const response = await authApi.login(payload);
    localStorage.setItem("access_token", response.data.access_token);
    thunkAPI.dispatch(getMe());
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload: IRegisterFormValues, thunkAPI) => {
    const response = await authApi.register(payload);
    localStorage.setItem("access_token", response.data.access_token);
    thunkAPI.dispatch(getMe());
  }
);

const initialState: IAuthState = {
  currentUser: { ...initialUser },
  isAuth: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = initialState.currentUser;
      state.isAuth = false;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {});
    builder.addCase(getMe.rejected, (state) => {
      state.isAuth = false;
      state.currentUser = initialState.currentUser;
    });
    builder.addCase(
      getMe.fulfilled,
      (state, action: PayloadAction<IResponse<IUser>>) => {
        state.isAuth = true;
        state.currentUser = action.payload.data.user;
      }
    );
    builder.addCase(login.pending, (state) => {});
    builder.addCase(login.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isAuth = true;
    });
    builder.addCase(register.pending, (state) => {});
    builder.addCase(register.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isAuth = true;
    });
  },
});

const { actions, reducer: authReducer } = authSlice;

export const { logout } = actions;

export default authReducer;
