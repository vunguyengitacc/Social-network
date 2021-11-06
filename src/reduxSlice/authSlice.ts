import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import { IResponse } from "../models/common";
import { initialUser, IUser } from "../models/user";
import userApi from "../api/userApi";
import { ILoginFormValues } from "../pages/auth/components/Login";
import { IRegisterFormValues } from "../pages/auth/components/Register/form";

interface IAuthState {
  currentUser: IUser;
  isAuth: boolean;
}

export const getMe = createAsyncThunk("auth/getMe", async () => {
  const response = await authApi.getMe();
  return response;
});

export const updateMe = createAsyncThunk(
  "auth/updateMe",
  async (payload: Partial<IUser>) => {
    const response = await userApi.updateMe(payload);
    return response.data.user;
  }
);

export const addFriend = createAsyncThunk(
  "auth/addFriend",
  async (payload: string) => {
    const response = await userApi.addFriend(payload);
    return response.data.user;
  }
);

export const removeFriend = createAsyncThunk(
  "auth/removeFriend",
  async (payload: string) => {
    const response = await userApi.removeFriend(payload);
    return response.data.user;
  }
);

export const updateAvatar = createAsyncThunk(
  "story/updateAvatar",
  async (payload: File | null | undefined) => {
    if (payload && payload.type.match(/(png|jpg|jpge)/)) {
      let data = new FormData();
      data.append("file", payload);
      const response = await userApi.updateAvatar(data);
      return response.data.user;
    } else {
      throw Error("Please choose image file");
    }
  }
);

export const updateBackground = createAsyncThunk(
  "story/updateBackground",
  async (payload: File | null | undefined) => {
    if (payload && payload.type.match(/(png|jpg|jpge)/)) {
      let data = new FormData();
      data.append("file", payload);
      console.log(payload);
      const response = await userApi.updateBackground(data);
      return response.data.user;
    } else {
      throw new Error("Please choose image file");
    }
  }
);

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
    builder.addCase(updateMe.pending, (state) => {});
    builder.addCase(updateMe.rejected, (state) => {});
    builder.addCase(
      updateMe.fulfilled,
      (state, actions: PayloadAction<IUser>) => {
        state.currentUser = actions.payload;
      }
    );
    builder.addCase(updateAvatar.pending, (state) => {});
    builder.addCase(updateAvatar.rejected, (state) => {});
    builder.addCase(
      updateAvatar.fulfilled,
      (state, actions: PayloadAction<IUser>) => {
        console.log(actions.payload);
        state.currentUser = actions.payload;
      }
    );
    builder.addCase(updateBackground.pending, (state) => {});
    builder.addCase(updateBackground.rejected, (state) => {});
    builder.addCase(
      updateBackground.fulfilled,
      (state, actions: PayloadAction<IUser>) => {
        console.log(actions.payload);
        state.currentUser = actions.payload;
      }
    );
    builder.addCase(addFriend.pending, (state) => {});
    builder.addCase(addFriend.rejected, (state) => {});
    builder.addCase(
      addFriend.fulfilled,
      (state, actions: PayloadAction<IUser>) => {
        console.log(actions.payload);
        state.currentUser = actions.payload;
      }
    );
    builder.addCase(removeFriend.pending, (state) => {});
    builder.addCase(removeFriend.rejected, (state) => {});
    builder.addCase(
      removeFriend.fulfilled,
      (state, actions: PayloadAction<IUser>) => {
        console.log(actions.payload);
        state.currentUser = actions.payload;
      }
    );
  },
});

const { actions, reducer: authReducer } = authSlice;

export const { logout } = actions;

export default authReducer;
