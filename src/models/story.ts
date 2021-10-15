import { IUser } from "./user";

export interface IStory {
  _id: string;
  imageUri: string;
  content: string;
  owner: IUser | undefined;
  createdAt: Date;
}
