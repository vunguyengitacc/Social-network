import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import storyApi from "../api/storyApi";
import { IStory } from "../models/story";

export const storyAdapter = createEntityAdapter({
  selectId: (story: IStory) => story._id,
});

export const getMyStories = createAsyncThunk("story/getMyStories", async () => {
  const response = await storyApi.getMySories();
  return response.data.stories;
});

export const getStoriesByUserId = createAsyncThunk(
  "story/getStoriesByUserId",
  async (payload: string) => {
    const response = await storyApi.getByUserId(payload);
    return response.data.stories;
  }
);

const initialState = storyAdapter.getInitialState();

const storySlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyStories.pending, (state) => {});
    builder.addCase(getMyStories.rejected, (state) => {});
    builder.addCase(
      getMyStories.fulfilled,
      (state, actions: PayloadAction<IStory[]>) => {
        storyAdapter.removeAll(state);
        storyAdapter.setAll(state, actions.payload);
      }
    );
    builder.addCase(getStoriesByUserId.pending, (state) => {});
    builder.addCase(getStoriesByUserId.rejected, (state) => {});
    builder.addCase(
      getStoriesByUserId.fulfilled,
      (state, actions: PayloadAction<IStory[]>) => {
        storyAdapter.removeAll(state);
        storyAdapter.setAll(state, actions.payload);
      }
    );
  },
});

const { actions, reducer: storyReducer } = storySlice;

// eslint-disable-next-line
export const {} = actions;

export default storyReducer;
