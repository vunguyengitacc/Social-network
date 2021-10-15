import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const UISlice = createSlice({
  name: "UI",
  initialState: {
    isShowSearch: false,
  },
  reducers: {
    setShowSearch(state, action: PayloadAction<boolean>) {
      state.isShowSearch = action.payload;
    },
  },
});

const { actions, reducer: UIReducer } = UISlice;

export const { setShowSearch } = actions;

export default UIReducer;
