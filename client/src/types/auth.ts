export interface IAuth {
  accessToken: string;
  refreshToken: string;
}

export interface IRegistration {
  username: string;
  login: string;
  password: string;
}

export type ILogin = Omit<IRegistration, 'username'>;
