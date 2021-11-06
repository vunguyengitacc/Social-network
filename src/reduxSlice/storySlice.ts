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

export const getStories = createAsyncThunk(
  "story/getStories",
  async (seed: number) => {
    const response = await storyApi.getStories(seed);
    return response.data.stories;
  }
);

export const getMyStories = createAsyncThunk(
  "story/getMyStories",
  async (seed: number) => {
    const response = await storyApi.getMySories(seed);
    return response.data.stories;
  }
);

export const reactToStory = createAsyncThunk(
  "story/reactToStory",
  async (payload: { storyId: string; like?: boolean; dislike?: boolean }) => {
    const response = await storyApi.reactToStory({
      _id: payload.storyId,
      like: payload.like,
      dislike: payload.dislike,
    });
    return response.data.story;
  }
);

export const removeStory = createAsyncThunk(
  "story/remove",
  async (payload: string) => {
    await storyApi.removeStory(payload);
    return payload;
  }
);

export const update = createAsyncThunk(
  "story/update",
  async (payload: { _id: string; url: string; isPrivate: boolean }) => {
    const response = await storyApi.updateOne(payload);
    return response.data.story;
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
    builder.addCase(getStories.pending, (state) => {});
    builder.addCase(getStories.rejected, (state) => {});
    builder.addCase(
      getStories.fulfilled,
      (state, { payload }: PayloadAction<IStory[]>) => {
        storyAdapter.removeAll(state);
        storyAdapter.setAll(state, payload);
      }
    );
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
    builder.addCase(reactToStory.pending, (state) => {});
    builder.addCase(reactToStory.rejected, (state) => {});
    builder.addCase(
      reactToStory.fulfilled,
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
