import { IResponseInfo } from './response-info';

export interface IRole {
  id: number;
  title: string;
}

export interface IUser {
  id: number;
  username: string;
  rating: number;
  registration_date: string;
  last_visit_date: string;
  ip: string;
  roles: IRole[];
}

export interface IUserResponse {
  info?: IResponseInfo;
  results?: IUser[];
  errors?: string;
}
