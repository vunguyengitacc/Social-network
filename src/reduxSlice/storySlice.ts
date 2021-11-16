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
    return { stories: response.data.stories, seed };
  }
);

export const getMyStories = createAsyncThunk(
  "story/getMyStories",
  async (seed: number) => {
    const response = await storyApi.getMySories(seed);
    return { stories: response.data.stories, seed };
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
  async (payload: { _id: string; isPrivate: boolean }) => {
    const response = await storyApi.updateOne(payload);
    return response.data.story;
  }
);

export const getStoriesByUserId = createAsyncThunk(
  "story/getStoriesByUserId",
  async (payload: { id: string; seed?: number }) => {
    const response = await storyApi.getByUserId(payload.id, payload.seed || 0);
    return { stories: response.data.stories, seed: payload.seed || 0 };
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
  reducers: {
    updateStory: (state, { payload }: PayloadAction<IStory>) => {
      storyAdapter.updateOne(state, {
        id: payload._id,
        changes: payload,
      });
    },
    removeStoryFromState: (state, { payload }: PayloadAction<string>) => {
      storyAdapter.removeOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStories.pending, (state) => {});
    builder.addCase(getStories.rejected, (state) => {});
    builder.addCase(
      getStories.fulfilled,
      (
        state,
        {
          payload,
        }: PayloadAction<ReturnType<() => { stories: IStory[]; seed: number }>>
      ) => {
        if (payload.seed === 0) storyAdapter.removeAll(state);
        storyAdapter.addMany(state, payload.stories);
      }
    );
    builder.addCase(getMyStories.pending, (state) => {});
    builder.addCase(getMyStories.rejected, (state) => {});
    builder.addCase(
      getMyStories.fulfilled,
      (
        state,
        {
          payload,
        }: PayloadAction<ReturnType<() => { stories: IStory[]; seed: number }>>
      ) => {
        if (payload.seed === 0) storyAdapter.removeAll(state);
        storyAdapter.addMany(state, payload.stories);
      }
    );
    builder.addCase(getStoriesByUserId.pending, (state) => {});
    builder.addCase(getStoriesByUserId.rejected, (state) => {});
    builder.addCase(
      getStoriesByUserId.fulfilled,
      (
        state,
        {
          payload,
        }: PayloadAction<ReturnType<() => { stories: IStory[]; seed: number }>>
      ) => {
        if (payload.seed === 0) storyAdapter.removeAll(state);
        storyAdapter.addMany(state, payload.stories);
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
        console.log("Delete is done");
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
      (state, { payload }: PayloadAction<IStory>) => {
        storyAdapter.updateOne(state, {
          id: payload._id,
          changes: payload,
        });
      }
    );
  },
});

const { actions, reducer: storyReducer } = storySlice;

// eslint-disable-next-line
export const { updateStory, removeStoryFromState } = actions;

export default storyReducer;
