import { IResponse, IResponseList } from "../models/common";
import { IUser } from "../models/user";
import axiosClient from "./axiosClient";

const userApi = {
  search(payload: string): Promise<IResponseList<IUser>> {
    return axiosClient.get(`/users/search/${payload}`);
  },
  getById(payload: string): Promise<IResponse<IUser>> {
    console.log(payload);
    return axiosClient.get(`/users/${payload}`);
  },
};

export default userApi;
