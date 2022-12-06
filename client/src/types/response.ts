import { Maybe } from './maybe';
import { IUser } from './user';

export interface IErrorResponse {
  errors?: string;
}

export interface IResponseInfo {
  total: number;
  next: Maybe<string>;
  prev: Maybe<string>;
  pages: number;
}

export interface ISuccessResponse<T> {
  info: IResponseInfo;
  results: T;
}

export function instanceOfErrorResponse(object: any): object is IErrorResponse {
  return 'errors' in object;
}
