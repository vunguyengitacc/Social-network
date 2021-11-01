import { IResponse, IResponseList } from "../models/common";
import { INotification } from "../models/notification";
import { IUser } from "../models/user";
import axiosClient from "./axiosClient";

const userApi = {
  search(payload: string): Promise<IResponseList<IUser>> {
    return axiosClient.get(`/users/search?term=${payload}`);
  },
  getById(payload: string): Promise<IResponse<IUser>> {
    return axiosClient.get(`/users/${payload}`);
  },
  updateMe(payload: Partial<IUser>): Promise<IResponse<IUser>> {
    return axiosClient.put("/users/me", payload);
  },
  updateAvatar(payload: FormData): Promise<IResponse<IUser>> {
    return axiosClient.put(`/users/avatar/me`, payload);
  },
  updateBackground(payload: FormData): Promise<IResponse<IUser>> {
    return axiosClient.put(`/users/background/me`, payload);
  },
  addFriend(payload: string): Promise<IResponse<IUser>> {
    return axiosClient.put("/users/me/friend", { userId: payload });
  },
  removeFriend(payload: string): Promise<IResponse<IUser>> {
    return axiosClient.delete(`/users/me/friend/${payload}`);
  },
  denyRequest(payload: string): Promise<IResponse<INotification>> {
    return axiosClient.delete(`/users/me/friend/${payload}/answer`);
  },
  acceptRequest(payload: string): Promise<IResponse<INotification>> {
    return axiosClient.post(`/users/me/friend/${payload}/answer`);
  },
};

export default userApi;
