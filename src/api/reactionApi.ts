import { IResponse, IResponseList } from "models/common";
import { IGroup, IReaction } from "models/reaction";
import axiosClient from "./axiosClient";

const reactionApi = {
  getByStoryId(storyId: string): Promise<IResponseList<IReaction>> {
    return axiosClient.get(`/reactions/${storyId}`);
  },
  reactToStory(payload: {
    storyId: string;
    type: number;
  }): Promise<IResponse<IReaction>> {
    return axiosClient.post(`/reactions/${payload.storyId}`, payload);
  },
  getMyReaction(storyId: string): Promise<IResponse<IReaction>> {
    return axiosClient.get(`/reactions/${storyId}/me`);
  },
  deleteOne(storyId: string): Promise<IResponse<IReaction>> {
    return axiosClient.delete(`reactions/${storyId}`);
  },
  getOverall(storyId: string): Promise<IResponseList<IGroup>> {
    return axiosClient.get(`reactions/${storyId}/overall`);
  },
};

export default reactionApi;
