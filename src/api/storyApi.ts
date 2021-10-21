import { IResponse, IResponseList } from "../models/common";
import { IStory } from "../models/story";
import axiosClient from "./axiosClient";

const storyApi = {
  getMySories(): Promise<IResponseList<IStory>> {
    return axiosClient.get("/stories/me");
  },
  getByUserId(payload: string): Promise<IResponseList<IStory>> {
    return axiosClient.get(`/stories/${payload}`);
  },
  addNewStories(payload: FormData): Promise<IResponse<IStory>> {
    console.log((payload.get("file") as File).type);
    return axiosClient.post(`/stories/me`, payload);
  },
};

export default storyApi;
