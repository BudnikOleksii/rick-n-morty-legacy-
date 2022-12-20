import { ISuccessResponse } from './response';
import { IUser } from './user';
import { Maybe } from './helper-types';

export interface IChat {
  id: number;
  name: string;
  users: Omit<IUser, 'roles'>[];
}

export interface IMessage {
  id: number;
  chat_id: number;
  body: string;
  created_at: string;
  updated_at: Maybe<string>;
  deleted_at: Maybe<string>;
  user: Omit<IUser, 'roles'>;
}

export interface INewMessage {
  body: string;
}

export type IChatResponse = ISuccessResponse<IChat[]>;
export type IMessagesResponse = ISuccessResponse<IMessage[]>;
