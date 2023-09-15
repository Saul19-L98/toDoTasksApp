export interface IUser {
  email: string;
  password: string;
}

export interface IRegisterUser extends IUser {
  username: string;
}
