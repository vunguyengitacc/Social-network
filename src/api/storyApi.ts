import { IResponseList } from "../models/common";
import { IStory } from "../models/story";
import axiosClient from "./axiosClient";
import axiosFileSender from "./axiosFileSender";

const storyApi = {
  getMySories(): Promise<IResponseList<IStory>> {
    return axiosClient.get("/stories/me");
  },
  getByUserId(payload: string): Promise<IResponseList<IStory>> {
    return axiosClient.get(`/stories/${payload}`);
  },
  addNewStories(payload: FormData): Promise<any> {
    return axiosFileSender.post(`/stories/me`, payload);
  },
};

export default storyApi;
