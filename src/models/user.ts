export interface IUser {
  _id: string;
  fullname: string;
  username?: string;
  avatarUri: string;
  job: string;
  address: string;
  education: string[];
}

export const initialUser: IUser = {
  fullname: "",
  _id: "",
  avatarUri: "",
  address: "",
  job: "",
  education: [],
};
