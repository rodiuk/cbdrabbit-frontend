export interface IUser extends IUserData {
  id: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IUserData {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}
