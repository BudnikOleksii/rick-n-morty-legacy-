import { IUser } from './user';
import { IErrorResponse } from './response';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IRegistration {
  username: string;
  login: string;
  password: string;
}

export type ILogin = Omit<IRegistration, 'username'>;

interface IUserWithTokens {
  tokens: ITokens;
  user: IUser;
}

export type IAuthResponse = IUserWithTokens | IErrorResponse;
export type ILogoutResponse = number | IErrorResponse;
