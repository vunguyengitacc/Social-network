import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import storyApi from "../api/storyApi";
import { RootState } from "../app/store";
import { IStory } from "../models/story";
import { throwAlert } from "./UISlice";

export const storyAdapter = createEntityAdapter({
  selectId: (story: IStory) => story._id,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

export const getMyStories = createAsyncThunk("story/getMyStories", async () => {
  const response = await storyApi.getMySories();
  return response.data.stories;
});

export const removeStory = createAsyncThunk(
  "story/remove",
  async (payload: string, thunkApi) => {
    try {
      await storyApi.removeStory(payload);
      await thunkApi.dispatch(
        throwAlert({
          isShow: true,
          message: "Remove successfully",
          type: "success",
        })
      );
      return payload;
    } catch (err) {
      thunkApi.dispatch(
        throwAlert({ type: "error", message: "failed to remove", isShow: true })
      );
      throw Error("failed");
    }
  }
);

export const update = createAsyncThunk(
  "story/update",
  async (
    payload: { _id: string; url: string; isPrivate: boolean },
    thunkApi
  ) => {
    try {
      const response = await storyApi.updateOne(payload);
      await thunkApi.dispatch(
        throwAlert({
          isShow: true,
          message: "Update successfully",
          type: "success",
        })
      );
      return response.data.story;
    } catch (err) {
      thunkApi.dispatch(
        throwAlert({ type: "error", message: "failed to update", isShow: true })
      );
      throw Error("failed");
    }
  }
);

export const getStoriesByUserId = createAsyncThunk(
  "story/getStoriesByUserId",
  async (payload: string) => {
    const response = await storyApi.getByUserId(payload);
    return response.data.stories;
  }
);

export const addStory = createAsyncThunk(
  "story/createOne",
  async (payload: FormData, thunkApi) => {
    const response = await storyApi.addNewStories(payload);
    await thunkApi.dispatch(
      throwAlert({ isShow: true, message: "Send sucessfully", type: "success" })
    );
    return response.data.story;
  }
);

export const storiesSelector = storyAdapter.getSelectors(
  (state: RootState) => state.story
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
    builder.addCase(addStory.pending, (state) => {});
    builder.addCase(addStory.rejected, (state) => {});
    builder.addCase(
      addStory.fulfilled,
      (state, actions: PayloadAction<IStory>) => {
        storyAdapter.addOne(state, actions.payload);
      }
    );
    builder.addCase(removeStory.pending, (state) => {});
    builder.addCase(removeStory.rejected, (state) => {});
    builder.addCase(
      removeStory.fulfilled,
      (state, actions: PayloadAction<string>) => {
        storyAdapter.removeOne(state, actions.payload);
      }
    );
    builder.addCase(update.pending, (state) => {});
    builder.addCase(update.rejected, (state) => {});
    builder.addCase(
      update.fulfilled,
      (state, actions: PayloadAction<IStory>) => {
        storyAdapter.updateOne(state, {
          id: actions.payload._id,
          changes: actions.payload,
        });
      }
    );
  },
});

const { actions, reducer: storyReducer } = storySlice;

// eslint-disable-next-line
export const {} = actions;

export default storyReducer;
