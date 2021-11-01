import { IResponseList } from "../models/common";
import { INotification } from "../models/notification";
import axiosClient from "./axiosClient";

const notificationApi = {
  getAllToMe(): Promise<IResponseList<INotification>> {
    return axiosClient.get("/notifications/");
  },
};

export default notificationApi;
