import { IResponse, IResponseList } from "../models/common";
import { IUser } from "../models/user";
import axiosClient from "./axiosClient";

const userApi = {
  search(payload: string): Promise<IResponseList<IUser>> {
    return axiosClient.get(`/users/search?term=${payload}`);
  },
  getById(payload: string): Promise<IResponse<IUser>> {
    return axiosClient.get(`/users/${payload}`);
  },
  updateMe(
    payload: Pick<IUser, "fullname" | "address" | "education" | "job">
  ): Promise<IResponse<IUser>> {
    return axiosClient.put("/users/me", payload);
  },
  updateAvatar(payload: FormData): Promise<IResponse<IUser>> {
    console.log((payload.get("file") as File).type);
    return axiosClient.put(`/users/avatar/me`, payload);
  },
  updateBackground(payload: FormData): Promise<IResponse<IUser>> {
    console.log((payload.get("file") as File).type);
    return axiosClient.put(`/users/background/me`, payload);
  },
};

export default userApi;
