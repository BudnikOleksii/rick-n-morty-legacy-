import { Maybe } from './maybe';

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

export type IErrors = Maybe<string[]>;
