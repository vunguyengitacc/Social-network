import { IStory } from "./story";
import { IUser } from "./user";

export interface IComment {
  _id: string;
  owner: IUser;
  story: IStory;
  storyId: string;
  content: string;
}
