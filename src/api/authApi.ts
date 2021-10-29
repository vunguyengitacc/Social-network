import { IResponse } from "../models/common";
import { IUser } from "../models/user";
import { ILoginFormValues } from "../pages/auth/components/Login";
import { IRegisterFormValues } from "../pages/auth/components/Register";
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
