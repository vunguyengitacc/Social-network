import { IComment } from "models/comment";
import { IResponse, IResponseList } from "models/common";
import axiosClient from "./axiosClient";

const commentApi = {
  getByStoryId(storyId: string): Promise<IResponseList<IComment>> {
    return axiosClient.get(`/comments/story/${storyId}`);
  },
  deleteById(commentId: string): Promise<IResponse<string>> {
    return axiosClient.delete(`/comments/${commentId}`);
  },
  create(payload: {
    storyId: string;
    content: string;
  }): Promise<IResponse<IComment>> {
    return axiosClient.post("comments", payload);
  },
};

export default commentApi;
