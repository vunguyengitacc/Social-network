import { IUser } from "./user";

export interface IReaction {
  userId: string;
  owner?: IUser;
  storyId: string;
  reactType: number;
}

export interface IGroup {
  _id: string;
  count: number;
}

export const initReaction: IReaction = {
  storyId: "",
  reactType: 0,
  userId: "",
};
