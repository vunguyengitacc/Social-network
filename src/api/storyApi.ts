import { IResponse, IResponseList } from "../models/common";
import { IStory } from "../models/story";
import axiosClient from "./axiosClient";

const storyApi = {
  getStories(seed: number): Promise<IResponseList<IStory>> {
    return axiosClient.get(`/stories/${seed}`);
  },
  getMySories(seed: number): Promise<IResponseList<IStory>> {
    return axiosClient.get(`/stories/me/${seed}`);
  },
  getByUserId(payload: string): Promise<IResponseList<IStory>> {
    return axiosClient.get(`/stories/${payload}`);
  },
  addNewStories(payload: FormData): Promise<IResponse<IStory>> {
    console.log((payload.get("file") as File).type);
    return axiosClient.post(`/stories/me`, payload);
  },
  removeStory(payload: string): Promise<IResponse<any>> {
    return axiosClient.delete(`/stories/me/${payload}`);
  },
  updateOne(payload: {
    _id: string;
    isPrivate: boolean;
    url: string;
  }): Promise<IResponse<IStory>> {
    return axiosClient.put(`/stories/me/${payload._id}`, payload);
  },
  reactToStory(payload: {
    _id: string;
    like?: boolean;
    dislike?: boolean;
  }): Promise<IResponse<IStory>> {
    return axiosClient.put(`/stories/${payload._id}`, payload);
  },
};

export default storyApi;
