import { IUser } from './user';

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

export interface IAuthResponse {
  tokens?: ITokens;
  user?: IUser;
  errors?: string[];
}
