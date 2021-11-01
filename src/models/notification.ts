import { IUser } from "./user";

export interface INotification {
  _id: string;
  to: IUser;
  from: IUser;
  message: string;
  type: number;
  active: boolean;
}
