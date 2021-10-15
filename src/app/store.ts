import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reduxSlice/authSlice";
import storyReducer from "../reduxSlice/storySlice";
import UIReducer from "../reduxSlice/UISlice";

const RootReducer = {
  auth: authReducer,
  story: storyReducer,
  ui: UIReducer,
};

const store = configureStore({
  reducer: RootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
