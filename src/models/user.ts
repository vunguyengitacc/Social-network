export interface IUser {
  _id: string;
  fullname: string;
  username?: string;
  avatarUri: string;
}

export const initialUser: IUser = {
  fullname: "",
  _id: "",
  avatarUri: "",
};
