import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAlert {
  isShow: boolean;
  type: AlertColor;
  message: string;
}

const initialAlert: IAlert = {
  isShow: false,
  type: "info",
  message: "",
};

const UISlice = createSlice({
  name: "UI",
  initialState: {
    isShowSearch: false,
    alert: initialAlert,
  },
  reducers: {
    throwAlert(state, action: PayloadAction<IAlert>) {
      state.alert.isShow = action.payload.isShow;
      state.alert.message = action.payload.message;
      state.alert.type = action.payload.type;
    },
    closeAlert(state) {
      state.alert = initialAlert;
    },
    setShowSearch(state, action: PayloadAction<boolean>) {
      state.isShowSearch = action.payload;
    },
  },
});

const { actions, reducer: UIReducer } = UISlice;

export const { setShowSearch, closeAlert, throwAlert } = actions;

export default UIReducer;
