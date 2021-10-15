import { ILoginFormValues } from "../components/Login/Login";
import { IRegisterFormValues } from "../components/Register/Register";
import { IResponse } from "../models/common";
import { IUser } from "../models/user";
import axiosClient from "./axiosClient";

const authApi = {
  getMe(): Promise<IResponse<IUser>> {
    return axiosClient.get("/auth/me");
  },
  login(payload: ILoginFormValues): Promise<IResponse<any>> {
    return axiosClient.post("/auth/login", payload);
  },
  register(payload: IRegisterFormValues): Promise<IResponse<any>> {
    return axiosClient.post("/auth/register", payload);
  },
};

export default authApi;
