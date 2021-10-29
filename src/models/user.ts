export interface IUser {
  _id: string;
  fullname: string;
  username?: string;
  avatarUri: string;
  backgroundUrl: string;
  job: string[];
  address: string;
  education: string[];
  phone: string;
  friendId: string[];
  friendRequestId: string[];
  friendWaitingId: string[];
}

export const initialUser: IUser = {
  fullname: "",
  _id: "",
  avatarUri: "",
  address: "",
  job: [],
  backgroundUrl: "",
  education: [],
  phone: "",
  friendId: [],
  friendRequestId: [],
  friendWaitingId: [],
};
