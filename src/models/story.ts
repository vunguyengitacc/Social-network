import { IUser } from "./user";

export interface IStory {
  _id: string;
  imageUrl: string;
  content: string;
  owner: IUser | undefined;
  createdAt: Date;
  isPrivate: boolean;
  likeById: string[];
  dislikeById: string[];
}
