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

export interface ICreateUser {
  email: string;
  password: string;
}

export interface IUserCheckoutForm {
  firstName: string;
  lastName: string;
  phone: string;
}
