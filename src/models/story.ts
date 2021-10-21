import { IUser } from "./user";

export interface IStory {
  _id: string;
  imageUrl: string;
  content: string;
  owner: IUser | undefined;
  createdAt: Date;
}
