import { ISuccessResponse } from './response';

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
  balance: number;
}

export type IUsersResponse = ISuccessResponse<IUser[]>;
