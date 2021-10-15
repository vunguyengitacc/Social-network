import { IResponseList } from "../models/common";
import { IStory } from "../models/story";
import axiosClient from "./axiosClient";

const storyApi = {
  getMySories(): Promise<IResponseList<IStory>> {
    return axiosClient.get("/stories/me");
  },
  getByUserId(payload: string): Promise<IResponseList<IStory>> {
    return axiosClient.get(`/stories/${payload}`);
  },
};

export default storyApi;
